import type { Answer, Question } from '../../types/content';
import type { QuestionStatus } from '../../engine/levelEngine';

export interface QuestionViewProps<Q extends Question = Question> {
  question: Q;
  draft: Answer | null;
  status: QuestionStatus;
  /** Original indices the player has already tried and got wrong. */
  ruledOut: number[];
  onChange: (answer: Answer) => void;
  /**
   * Check an answer. Pass one explicitly when it is produced asynchronously
   * (the code runner) and cannot wait for the draft to round-trip through state.
   */
  onSubmit: (answer?: Answer) => void;
}
