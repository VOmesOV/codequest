import { useMemo } from 'react';
import type { OrderQuestion } from '../../types/content';
import { seededOrder } from '../../engine/shuffle';
import { RichText } from '../ui';
import type { QuestionViewProps } from './types';

/**
 * Click-to-order rather than drag-and-drop: it works identically with a mouse,
 * a finger and a keyboard, and beginners never lose a step mid-drag.
 */
export function OrderSteps({
  question,
  draft,
  status,
  onChange,
}: QuestionViewProps<OrderQuestion>) {
  const pool = useMemo(
    () => seededOrder(question.items.length, question.id),
    [question.items.length, question.id],
  );

  const chosen = draft && draft.kind === 'order' ? draft.order : [];
  const locked = status === 'correct';

  const pick = (originalIndex: number) => {
    if (locked || chosen.includes(originalIndex)) return;
    onChange({ kind: 'order', order: [...chosen, originalIndex] });
  };

  const drop = (originalIndex: number) => {
    if (locked) return;
    onChange({ kind: 'order', order: chosen.filter((i) => i !== originalIndex) });
  };

  const remaining = pool.filter((i) => !chosen.includes(i));

  return (
    <div className="ordering">
      <div className="ordering__panel">
        <div className="ordering__title">Your sequence</div>
        {chosen.length === 0 ? (
          <p className="ordering__empty">Tap the steps below in the order they should happen.</p>
        ) : (
          <ol className="ordering__list">
            {chosen.map((originalIndex, position) => (
              <li key={originalIndex}>
                <button
                  type="button"
                  className={[
                    'step',
                    'step--chosen',
                    locked ? 'step--locked' : '',
                    status === 'wrong' && originalIndex !== position ? 'step--suspect' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={locked}
                  onClick={() => drop(originalIndex)}
                  title={locked ? undefined : 'Remove from sequence'}
                >
                  <span className="step__num">{position + 1}</span>
                  <span className="step__text">
                    <RichText text={question.items[originalIndex]} />
                  </span>
                  {!locked && <span className="step__remove">✕</span>}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      {remaining.length > 0 && (
        <div className="ordering__panel ordering__panel--pool">
          <div className="ordering__title">Steps to place</div>
          <div className="ordering__pool">
            {remaining.map((originalIndex) => (
              <button
                key={originalIndex}
                type="button"
                className="step step--pool"
                disabled={locked}
                onClick={() => pick(originalIndex)}
              >
                <span className="step__text">
                  <RichText text={question.items[originalIndex]} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
