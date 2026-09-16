import { useEffect, useMemo } from 'react';
import type { McqQuestion, PredictOutputQuestion } from '../../types/content';
import { seededOrder } from '../../engine/shuffle';
import { RichText } from '../ui';
import type { QuestionViewProps } from './types';

/**
 * Serves both `mcq` and `predict-output`: the only difference between them is
 * that predict-output always shows a snippet, which `QuestionFrame` renders.
 */
export function ChoiceQuestion({
  question,
  draft,
  status,
  ruledOut,
  onChange,
}: QuestionViewProps<McqQuestion | PredictOutputQuestion>) {
  const shuffle = question.kind === 'mcq' ? question.shuffleOptions !== false : true;

  // Seeded by question id so the buttons never move underneath the player.
  const order = useMemo(
    () =>
      shuffle
        ? seededOrder(question.options.length, question.id)
        : question.options.map((_, i) => i),
    [shuffle, question.options, question.id],
  );

  const selected = draft && draft.kind === question.kind ? draft.index : null;
  const locked = status === 'correct';

  useEffect(() => {
    if (locked) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      const position = Number(event.key) - 1;
      if (Number.isInteger(position) && position >= 0 && position < order.length) {
        event.preventDefault();
        onChange({ kind: question.kind, index: order[position] } as never);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [locked, order, onChange, question.kind]);

  return (
    <div className="choices">
      {order.map((originalIndex, position) => {
        const isSelected = selected === originalIndex;
        const isRuledOut = ruledOut.includes(originalIndex);
        const isCorrectOne = locked && originalIndex === question.correctIndex;

        return (
          <button
            key={originalIndex}
            type="button"
            className={[
              'choice',
              isSelected ? 'choice--selected' : '',
              isRuledOut ? 'choice--wrong' : '',
              isCorrectOne ? 'choice--correct' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={locked}
            onClick={() => onChange({ kind: question.kind, index: originalIndex } as never)}
          >
            <span className="choice__key">{position + 1}</span>
            <span className="choice__label">
              <RichText text={question.options[originalIndex]} />
            </span>
            {isRuledOut && <span className="choice__mark">✕</span>}
            {isCorrectOne && <span className="choice__mark">✓</span>}
          </button>
        );
      })}
    </div>
  );
}
