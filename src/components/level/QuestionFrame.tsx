import type { Answer, Question } from '../../types/content';
import type { QuestionStatus } from '../../engine/levelEngine';
import { ChoiceQuestion } from '../questions/ChoiceQuestion';
import { CodeChallenge } from '../questions/CodeChallenge';
import { FillBlank } from '../questions/FillBlank';
import { OrderSteps } from '../questions/OrderSteps';
import { TrueFalse } from '../questions/TrueFalse';
import { CodeBlock, RichText } from '../ui';

const KIND_LABEL: Record<Question['kind'], string> = {
  mcq: 'Choose one',
  'true-false': 'True or false',
  'predict-output': 'Predict the output',
  order: 'Put it in order',
  'fill-blank': 'Fill in the blanks',
  code: 'Write the code',
};

interface QuestionFrameProps {
  question: Question;
  draft: Answer | null;
  status: QuestionStatus;
  ruledOut: number[];
  attempts: number;
  solutionShown: boolean;
  onChange: (answer: Answer) => void;
  onSubmit: (answer?: Answer) => void;
  onShowSolution: () => void;
}

/** Shared chrome for every question kind, plus the one switch that picks a renderer. */
export function QuestionFrame(props: QuestionFrameProps) {
  const { question, draft, status, ruledOut, onChange, onSubmit } = props;
  const shared = { draft, status, ruledOut, onChange, onSubmit };

  return (
    <div className="question">
      <div className="question__kind">{KIND_LABEL[question.kind]}</div>
      <h2 className="question__prompt">
        <RichText text={question.prompt} />
      </h2>

      {question.kind === 'predict-output' ? (
        <CodeBlock code={question.code} label="What does this print?" />
      ) : (
        question.code && <CodeBlock code={question.code} />
      )}

      <div className="question__body">
        {question.kind === 'mcq' && <ChoiceQuestion question={question} {...shared} />}
        {question.kind === 'predict-output' && <ChoiceQuestion question={question} {...shared} />}
        {question.kind === 'true-false' && <TrueFalse question={question} {...shared} />}
        {question.kind === 'order' && <OrderSteps question={question} {...shared} />}
        {question.kind === 'fill-blank' && <FillBlank question={question} {...shared} />}
        {question.kind === 'code' && (
          <CodeChallenge
            question={question}
            {...shared}
            attempts={props.attempts}
            solutionShown={props.solutionShown}
            onShowSolution={props.onShowSolution}
          />
        )}
      </div>
    </div>
  );
}
