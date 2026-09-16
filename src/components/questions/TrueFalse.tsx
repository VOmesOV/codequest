import type { TrueFalseQuestion } from '../../types/content';
import type { QuestionViewProps } from './types';

export function TrueFalse({
  question,
  draft,
  status,
  onChange,
}: QuestionViewProps<TrueFalseQuestion>) {
  const selected = draft && draft.kind === 'true-false' ? draft.value : null;
  const locked = status === 'correct';

  return (
    <div className="truefalse">
      {[true, false].map((value) => {
        const isSelected = selected === value;
        const isWrongPick = status === 'wrong' && isSelected;
        const isCorrectOne = locked && value === question.answer;

        return (
          <button
            key={String(value)}
            type="button"
            className={[
              'tf-btn',
              value ? 'tf-btn--true' : 'tf-btn--false',
              isSelected ? 'tf-btn--selected' : '',
              isWrongPick ? 'tf-btn--wrong' : '',
              isCorrectOne ? 'tf-btn--correct' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={locked}
            onClick={() => onChange({ kind: 'true-false', value })}
          >
            <span className="tf-btn__icon">{value ? '✓' : '✕'}</span>
            <span className="tf-btn__text">{value ? 'True' : 'False'}</span>
          </button>
        );
      })}
    </div>
  );
}
