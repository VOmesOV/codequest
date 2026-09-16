/**
 * The content contract.
 *
 * Every level in the game is plain data that matches these types. Adding new
 * material never requires touching the engine: write a `Level` object, drop it
 * into a chapter, and the renderers, grader and scoring already understand it.
 */

export interface QuestionBase {
  /** Unique within its level, e.g. "q1". */
  id: string;
  /** The question itself. Supports `backticks` for inline code. */
  prompt: string;
  /** Optional read-only snippet shown above the prompt. */
  code?: string;
  /** Shown once the player has answered correctly. Always teach something here. */
  explanation: string;
  /** Revealed one at a time, each costs points. */
  hints?: string[];
}

/** Pick one of several options. */
export interface McqQuestion extends QuestionBase {
  kind: 'mcq';
  options: string[];
  correctIndex: number;
  /** Options are shuffled per question by default; set false to keep the order. */
  shuffleOptions?: boolean;
}

/** Decide whether a statement holds. */
export interface TrueFalseQuestion extends QuestionBase {
  kind: 'true-false';
  answer: boolean;
}

/** "What does this print?" — always paired with a code snippet. */
export interface PredictOutputQuestion extends QuestionBase {
  kind: 'predict-output';
  code: string;
  options: string[];
  correctIndex: number;
}

/** Click the items in the right order. Authored in the CORRECT order; the engine shuffles. */
export interface OrderQuestion extends QuestionBase {
  kind: 'order';
  items: string[];
}

/** Fill each `{{0}}`, `{{1}}` … slot in the template from its own word bank. */
export interface FillBlankQuestion extends QuestionBase {
  kind: 'fill-blank';
  template: string;
  blanks: Array<{ choices: string[]; correctIndex: number }>;
}

/** A single automated check run against the player's code. */
export type CodeTest =
  | {
      type: 'output';
      /** Every line the program must print, in order. */
      expectedLogs: string[];
      description?: string;
    }
  | {
      type: 'function';
      /** Name of the function the player must define. */
      name: string;
      args: unknown[];
      expected: unknown;
      description?: string;
    };

/** Write real JavaScript; it runs in a sandbox and is checked against `tests`. */
export interface CodeQuestion extends QuestionBase {
  kind: 'code';
  starterCode: string;
  tests: CodeTest[];
  /** A working answer. Offered after repeated failures, and verified by the content tests. */
  solution: string;
}

export type Question =
  | McqQuestion
  | TrueFalseQuestion
  | PredictOutputQuestion
  | OrderQuestion
  | FillBlankQuestion
  | CodeQuestion;

export type QuestionKind = Question['kind'];

export interface Level {
  /** Globally unique, e.g. "ch03-l04". */
  id: string;
  title: string;
  /** One line: what the player walks away knowing. */
  concept: string;
  /** Teaching cards shown before the first question. */
  intro?: string[];
  questions: Question[];
  /** The last level of every chapter. Gates the next chapter. */
  boss?: boolean;
  /** XP for a flawless run. Regular levels 50, bosses 150. */
  baseXp: number;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  /** A single emoji shown on the map. */
  icon: string;
  levels: Level[];
}

/* ---- Answers -------------------------------------------------------------
 * What the player has entered so far for the current question. One shape per
 * question kind, so the grader can be a single exhaustive switch.
 */

export type Answer =
  | { kind: 'mcq'; index: number }
  | { kind: 'true-false'; value: boolean }
  | { kind: 'predict-output'; index: number }
  | { kind: 'order'; order: number[] }
  | { kind: 'fill-blank'; choices: Array<number | null> }
  | { kind: 'code'; source: string; passed: boolean };
