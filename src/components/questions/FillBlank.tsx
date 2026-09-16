import { useMemo, useState } from 'react';
import type { FillBlankQuestion } from '../../types/content';
import type { QuestionViewProps } from './types';

type Segment = { type: 'text'; value: string } | { type: 'blank'; index: number };

/** Splits `"let x = {{0}};"` into literal text and numbered slots. */
function parseTemplate(template: string): Segment[] {
  const segments: Segment[] = [];
  const pattern = /\{\{(\d+)\}\}/g;
  let lastIndex = 0;

  for (const match of template.matchAll(pattern)) {
    const at = match.index ?? 0;
    if (at > lastIndex) segments.push({ type: 'text', value: template.slice(lastIndex, at) });
    segments.push({ type: 'blank', index: Number(match[1]) });
    lastIndex = at + match[0].length;
  }
  if (lastIndex < template.length) {
    segments.push({ type: 'text', value: template.slice(lastIndex) });
  }
  return segments;
}

export function FillBlank({ question, draft, status, onChange }: QuestionViewProps<FillBlankQuestion>) {
  const segments = useMemo(() => parseTemplate(question.template), [question.template]);
  const choices =
    draft && draft.kind === 'fill-blank'
      ? draft.choices
      : (question.blanks.map(() => null) as Array<number | null>);

  const locked = status === 'correct';
  const firstEmpty = choices.findIndex((c) => c === null);
  const [focused, setFocused] = useState(0);
  const activeBlank = locked ? -1 : choices[focused] === null ? focused : firstEmpty === -1 ? focused : firstEmpty;

  const fill = (choiceIndex: number) => {
    if (locked || activeBlank < 0) return;
    const next = [...choices];
    next[activeBlank] = choiceIndex;
    onChange({ kind: 'fill-blank', choices: next });

    // Jump to the next hole so the player can keep tapping without aiming.
    const following = next.findIndex((c) => c === null);
    setFocused(following === -1 ? activeBlank : following);
  };

  const clearBlank = (blankIndex: number) => {
    if (locked) return;
    const next = [...choices];
    next[blankIndex] = null;
    onChange({ kind: 'fill-blank', choices: next });
    setFocused(blankIndex);
  };

  const bank = activeBlank >= 0 ? question.blanks[activeBlank] : null;

  return (
    <div className="fillblank">
      <pre className="fillblank__template">
        <code>
          {segments.map((segment, i) => {
            if (segment.type === 'text') return <span key={i}>{segment.value}</span>;

            const value = choices[segment.index];
            const label =
              value === null ? '____' : question.blanks[segment.index].choices[value];
            const isCorrect = locked;

            return (
              <button
                key={i}
                type="button"
                className={[
                  'blank',
                  value === null ? 'blank--empty' : 'blank--filled',
                  segment.index === activeBlank ? 'blank--active' : '',
                  isCorrect ? 'blank--correct' : '',
                  status === 'wrong' &&
                  value !== null &&
                  value !== question.blanks[segment.index].correctIndex
                    ? 'blank--wrong'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={locked}
                onClick={() => (value === null ? setFocused(segment.index) : clearBlank(segment.index))}
              >
                {label}
              </button>
            );
          })}
        </code>
      </pre>

      {!locked && (
        <div className="fillblank__bank">
          <div className="fillblank__bank-label">
            {bank ? `Word bank for blank ${activeBlank + 1}` : 'All blanks filled'}
          </div>
          <div className="fillblank__chips">
            {bank?.choices.map((choice, index) => (
              <button
                key={index}
                type="button"
                className="chip"
                onClick={() => fill(index)}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
