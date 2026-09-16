import { describe, expect, it } from 'vitest';
import { gradeAnswer, isAnswerComplete, scoreQuestion } from '../src/engine/grading';
import { seededOrder } from '../src/engine/shuffle';
import type {
  CodeQuestion,
  FillBlankQuestion,
  McqQuestion,
  OrderQuestion,
  TrueFalseQuestion,
} from '../src/types/content';

const mcq: McqQuestion = {
  id: 'q1',
  kind: 'mcq',
  prompt: 'Pick one',
  options: ['a', 'b', 'c'],
  correctIndex: 1,
  explanation: 'because',
};

const trueFalse: TrueFalseQuestion = {
  id: 'q2',
  kind: 'true-false',
  prompt: 'Is it?',
  answer: true,
  explanation: 'because',
};

const order: OrderQuestion = {
  id: 'q3',
  kind: 'order',
  prompt: 'Sort',
  items: ['first', 'second', 'third'],
  explanation: 'because',
};

const fill: FillBlankQuestion = {
  id: 'q4',
  kind: 'fill-blank',
  prompt: 'Fill',
  template: 'let x {{0}} {{1}};',
  blanks: [
    { choices: ['=', '=='], correctIndex: 0 },
    { choices: ['1', '2'], correctIndex: 1 },
  ],
  explanation: 'because',
};

const code: CodeQuestion = {
  id: 'q5',
  kind: 'code',
  prompt: 'Write it',
  starterCode: '',
  tests: [{ type: 'output', expectedLogs: ['hi'] }],
  solution: 'console.log("hi");',
  explanation: 'because',
};

describe('gradeAnswer', () => {
  it('accepts the correct multiple choice option and rejects others', () => {
    expect(gradeAnswer(mcq, { kind: 'mcq', index: 1 })).toBe(true);
    expect(gradeAnswer(mcq, { kind: 'mcq', index: 0 })).toBe(false);
  });

  it('grades true/false', () => {
    expect(gradeAnswer(trueFalse, { kind: 'true-false', value: true })).toBe(true);
    expect(gradeAnswer(trueFalse, { kind: 'true-false', value: false })).toBe(false);
  });

  it('requires ordering answers to be the identity permutation', () => {
    expect(gradeAnswer(order, { kind: 'order', order: [0, 1, 2] })).toBe(true);
    expect(gradeAnswer(order, { kind: 'order', order: [0, 2, 1] })).toBe(false);
    // Partial sequences are never correct, even if what is there is right so far.
    expect(gradeAnswer(order, { kind: 'order', order: [0, 1] })).toBe(false);
  });

  it('requires every blank to match', () => {
    expect(gradeAnswer(fill, { kind: 'fill-blank', choices: [0, 1] })).toBe(true);
    expect(gradeAnswer(fill, { kind: 'fill-blank', choices: [0, 0] })).toBe(false);
    expect(gradeAnswer(fill, { kind: 'fill-blank', choices: [null, 1] })).toBe(false);
  });

  it('defers to the sandbox verdict for code', () => {
    expect(gradeAnswer(code, { kind: 'code', source: 'anything', passed: true })).toBe(true);
    expect(gradeAnswer(code, { kind: 'code', source: 'anything', passed: false })).toBe(false);
  });

  it('rejects a null answer or one of the wrong shape', () => {
    expect(gradeAnswer(mcq, null)).toBe(false);
    expect(gradeAnswer(mcq, { kind: 'true-false', value: true })).toBe(false);
  });
});

describe('isAnswerComplete', () => {
  it('only enables checking once every slot is filled', () => {
    expect(isAnswerComplete(order, { kind: 'order', order: [0, 1] })).toBe(false);
    expect(isAnswerComplete(order, { kind: 'order', order: [2, 0, 1] })).toBe(true);
    expect(isAnswerComplete(fill, { kind: 'fill-blank', choices: [0, null] })).toBe(false);
    expect(isAnswerComplete(fill, { kind: 'fill-blank', choices: [1, 1] })).toBe(true);
  });

  it('treats blank code as incomplete', () => {
    expect(isAnswerComplete(code, { kind: 'code', source: '   ', passed: false })).toBe(false);
    expect(isAnswerComplete(code, { kind: 'code', source: 'x', passed: false })).toBe(true);
  });
});

describe('scoreQuestion', () => {
  it('rewards a clean first try', () => {
    expect(scoreQuestion({ attempts: 0, hintsUsed: 0, solutionShown: false })).toBe(100);
  });

  it('charges for retries and hints alike', () => {
    expect(scoreQuestion({ attempts: 1, hintsUsed: 0, solutionShown: false })).toBe(75);
    expect(scoreQuestion({ attempts: 0, hintsUsed: 1, solutionShown: false })).toBe(75);
    expect(scoreQuestion({ attempts: 1, hintsUsed: 1, solutionShown: false })).toBe(50);
  });

  it('never drops below the floor, however many attempts it took', () => {
    expect(scoreQuestion({ attempts: 99, hintsUsed: 99, solutionShown: false })).toBe(25);
  });

  it('gives nothing when the answer was revealed', () => {
    expect(scoreQuestion({ attempts: 0, hintsUsed: 0, solutionShown: true })).toBe(0);
  });
});

describe('seededOrder', () => {
  it('is stable for the same seed', () => {
    expect(seededOrder(5, 'q1')).toEqual(seededOrder(5, 'q1'));
  });

  it('is a genuine permutation', () => {
    const result = [...seededOrder(6, 'abc')].sort((a, b) => a - b);
    expect(result).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('never hands an ordering puzzle back already solved', () => {
    for (let n = 2; n <= 8; n++) {
      for (const seed of ['a', 'b', 'c', 'q1', 'q2', 'ch01-l01']) {
        const order = seededOrder(n, seed);
        expect(order.every((value, index) => value === index)).toBe(false);
      }
    }
  });
});
