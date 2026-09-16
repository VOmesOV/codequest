import type { Answer, Question } from '../types/content';

/**
 * Pure answer checking. One exhaustive switch, no side effects, no DOM — which
 * is what makes the whole question system unit-testable in `tests/grading.test.ts`.
 *
 * Code questions are graded by the sandbox (see `runner/codeRunner.ts`) before
 * they get here, so all this does is read the verdict off the answer.
 */
export function gradeAnswer(question: Question, answer: Answer | null): boolean {
  if (!answer || answer.kind !== question.kind) return false;

  switch (question.kind) {
    case 'mcq':
      return answer.kind === 'mcq' && answer.index === question.correctIndex;

    case 'true-false':
      return answer.kind === 'true-false' && answer.value === question.answer;

    case 'predict-output':
      return answer.kind === 'predict-output' && answer.index === question.correctIndex;

    case 'order':
      return (
        answer.kind === 'order' &&
        answer.order.length === question.items.length &&
        answer.order.every((originalIndex, position) => originalIndex === position)
      );

    case 'fill-blank':
      return (
        answer.kind === 'fill-blank' &&
        answer.choices.length === question.blanks.length &&
        answer.choices.every((choice, i) => choice === question.blanks[i].correctIndex)
      );

    case 'code':
      return answer.kind === 'code' && answer.passed;
  }
}

/** True once every slot has something in it, so the Check button can enable. */
export function isAnswerComplete(question: Question, answer: Answer | null): boolean {
  if (!answer || answer.kind !== question.kind) return false;

  switch (question.kind) {
    case 'order':
      return answer.kind === 'order' && answer.order.length === question.items.length;
    case 'fill-blank':
      return answer.kind === 'fill-blank' && answer.choices.every((c) => c !== null);
    case 'code':
      return answer.kind === 'code' && answer.source.trim().length > 0;
    default:
      return true;
  }
}

export const PERFECT_SCORE = 100;
const PENALTY = 25;
const MIN_SCORE = 25;

/**
 * Forgiving by design: you can retry forever and you always finish the level.
 * What retries and hints cost you is *stars*, not progress.
 */
export function scoreQuestion(opts: {
  attempts: number;
  hintsUsed: number;
  solutionShown: boolean;
}): number {
  if (opts.solutionShown) return 0;
  const raw = PERFECT_SCORE - PENALTY * (opts.attempts + opts.hintsUsed);
  return Math.max(MIN_SCORE, raw);
}
