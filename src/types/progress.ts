export type Stars = 1 | 2 | 3;

export interface LevelRecord {
  stars: Stars;
  /** Best average question score, 0–100. */
  bestScore: number;
  completedAt: string;
}

export interface SavedProgress {
  version: 1;
  totalXp: number;
  levels: Record<string, LevelRecord>;
}

/** The outcome of one question inside a level run. */
export interface QuestionResult {
  questionId: string;
  title: string;
  score: number;
  attempts: number;
  hintsUsed: number;
  solutionShown: boolean;
}
