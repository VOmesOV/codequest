import type { Question } from '../../types/content';
import type { QuestionStatus } from '../../engine/levelEngine';
import { Button, RichText } from '../ui';

const WRONG_NUDGES = [
  'Not quite — take another look.',
  'Close! Try a different angle.',
  'Still not it. Want a hint?',
  'Keep going — mistakes are how this works.',
];

/**
 * Explanations are only revealed once the answer is right, so the panel can
 * never spoil a question the player is still working on.
 */
export function FeedbackPanel({
  question,
  status,
  attempts,
  hintsUsed,
  onContinue,
  onHint,
  isLastQuestion,
}: {
  question: Question;
  status: QuestionStatus;
  attempts: number;
  hintsUsed: number;
  onContinue: () => void;
  onHint: () => void;
  isLastQuestion: boolean;
}) {
  if (status === 'answering') return null;

  const hintsAvailable = question.hints?.length ?? 0;
  const canHint = hintsUsed < hintsAvailable;

  if (status === 'wrong') {
    return (
      <div className="feedback feedback--wrong" role="status">
        <div className="feedback__main">
          <div className="feedback__title">
            {WRONG_NUDGES[Math.min(attempts - 1, WRONG_NUDGES.length - 1)]}
          </div>
          <div className="feedback__sub">
            You can try as many times as you like — it only costs stars, never progress.
          </div>
        </div>
        {canHint && (
          <Button variant="ghost" onClick={onHint}>
            Show a hint
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="feedback feedback--correct" role="status">
      <div className="feedback__main">
        <div className="feedback__title">
          {attempts === 0 && hintsUsed === 0 ? 'Perfect!' : 'Correct!'}
        </div>
        <div className="feedback__explanation">
          <RichText text={question.explanation} />
        </div>
      </div>
      <Button variant="success" onClick={onContinue}>
        {isLastQuestion ? 'Finish level' : 'Continue'}
      </Button>
    </div>
  );
}
