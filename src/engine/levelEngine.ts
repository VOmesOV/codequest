import type { Answer, Level } from '../types/content';
import type { QuestionResult } from '../types/progress';
import { scoreQuestion } from './grading';

export type Phase = 'intro' | 'question' | 'summary';
export type QuestionStatus = 'answering' | 'wrong' | 'correct';

export interface LevelState {
  level: Level;
  phase: Phase;
  introIndex: number;
  questionIndex: number;
  /** What the player has entered but not yet checked. */
  draft: Answer | null;
  status: QuestionStatus;
  /** Failed checks on the current question. */
  attempts: number;
  hintsUsed: number;
  solutionShown: boolean;
  /** Wrong choices stay marked so the player can see what they already ruled out. */
  ruledOut: number[];
  results: QuestionResult[];
}

export type LevelAction =
  | { type: 'advance-intro' }
  | { type: 'skip-intro' }
  | { type: 'set-draft'; draft: Answer }
  | { type: 'submit'; correct: boolean }
  | { type: 'use-hint' }
  | { type: 'show-solution' }
  | { type: 'next-question' };

export function initLevelState(level: Level): LevelState {
  return {
    level,
    phase: level.intro && level.intro.length > 0 ? 'intro' : 'question',
    introIndex: 0,
    questionIndex: 0,
    draft: null,
    status: 'answering',
    attempts: 0,
    hintsUsed: 0,
    solutionShown: false,
    ruledOut: [],
    results: [],
  };
}

/** The index the player just got wrong, for single-choice question kinds. */
function chosenIndex(draft: Answer | null): number | null {
  if (!draft) return null;
  if (draft.kind === 'mcq' || draft.kind === 'predict-output') return draft.index;
  return null;
}

export function levelReducer(state: LevelState, action: LevelAction): LevelState {
  switch (action.type) {
    case 'advance-intro': {
      const total = state.level.intro?.length ?? 0;
      const next = state.introIndex + 1;
      return next >= total
        ? { ...state, phase: 'question', introIndex: 0 }
        : { ...state, introIndex: next };
    }

    case 'skip-intro':
      return { ...state, phase: 'question', introIndex: 0 };

    case 'set-draft':
      // Editing after a wrong check clears the red state, but the attempt still counted.
      return {
        ...state,
        draft: action.draft,
        status: state.status === 'wrong' ? 'answering' : state.status,
      };

    case 'submit': {
      if (state.status === 'correct') return state;
      if (action.correct) return { ...state, status: 'correct' };
      const wrong = chosenIndex(state.draft);
      return {
        ...state,
        status: 'wrong',
        attempts: state.attempts + 1,
        ruledOut:
          wrong !== null && !state.ruledOut.includes(wrong)
            ? [...state.ruledOut, wrong]
            : state.ruledOut,
      };
    }

    case 'use-hint': {
      const available = state.level.questions[state.questionIndex].hints?.length ?? 0;
      if (state.hintsUsed >= available) return state;
      return { ...state, hintsUsed: state.hintsUsed + 1 };
    }

    case 'show-solution':
      return { ...state, solutionShown: true };

    case 'next-question': {
      if (state.status !== 'correct') return state;
      const question = state.level.questions[state.questionIndex];
      const result: QuestionResult = {
        questionId: question.id,
        title: question.prompt,
        score: scoreQuestion({
          attempts: state.attempts,
          hintsUsed: state.hintsUsed,
          solutionShown: state.solutionShown,
        }),
        attempts: state.attempts,
        hintsUsed: state.hintsUsed,
        solutionShown: state.solutionShown,
      };
      const results = [...state.results, result];
      const nextIndex = state.questionIndex + 1;

      if (nextIndex >= state.level.questions.length) {
        return { ...state, phase: 'summary', results };
      }
      return {
        ...state,
        questionIndex: nextIndex,
        results,
        draft: null,
        status: 'answering',
        attempts: 0,
        hintsUsed: 0,
        solutionShown: false,
        ruledOut: [],
      };
    }
  }
}

export function averageScore(results: QuestionResult[]): number {
  if (results.length === 0) return 0;
  const total = results.reduce((sum, r) => sum + r.score, 0);
  return Math.round(total / results.length);
}
