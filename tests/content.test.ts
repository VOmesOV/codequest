import { describe, expect, it } from 'vitest';
import { ALL_LEVELS, CHAPTERS, findLevel } from '../src/content';
import { runInNode as executeAndTest } from './sandbox-node';
import type { CodeQuestion, Question } from '../src/types/content';

/**
 * The content lint.
 *
 * Content is where the volume is, and TypeScript can only check its shape — not
 * whether `correctIndex` points at a real option or whether an authored
 * solution actually solves its own exercise. These tests cover that gap, so a
 * new level either works or fails loudly the moment it is added.
 */

const allQuestions: Array<{ levelId: string; question: Question }> = ALL_LEVELS.flatMap((entry) =>
  entry.level.questions.map((question) => ({ levelId: entry.level.id, question })),
);

describe('registry', () => {
  it('has content in every chapter', () => {
    expect(CHAPTERS.length).toBeGreaterThan(0);
    for (const chapter of CHAPTERS) {
      expect(chapter.levels.length, `${chapter.id} has no levels`).toBeGreaterThan(0);
    }
  });

  it('gives every level a unique id', () => {
    const ids = ALL_LEVELS.map((entry) => entry.level.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('can look up every level by id', () => {
    for (const entry of ALL_LEVELS) {
      expect(findLevel(entry.level.id)?.level).toBe(entry.level);
    }
  });

  it('ends every chapter with exactly one boss level', () => {
    for (const chapter of CHAPTERS) {
      const bosses = chapter.levels.filter((level) => level.boss);
      expect(bosses.length, `${chapter.id} should have one boss`).toBe(1);
      expect(chapter.levels[chapter.levels.length - 1].boss, `${chapter.id} boss must be last`).toBe(
        true,
      );
    }
  });
});

describe('levels', () => {
  it('always has questions, a concept and a positive XP reward', () => {
    for (const { level } of ALL_LEVELS) {
      expect(level.questions.length, `${level.id} has no questions`).toBeGreaterThan(0);
      expect(level.title.trim().length, `${level.id} needs a title`).toBeGreaterThan(0);
      expect(level.concept.trim().length, `${level.id} needs a concept`).toBeGreaterThan(0);
      expect(level.baseXp, `${level.id} needs XP`).toBeGreaterThan(0);
    }
  });

  it('gives every question a unique id within its level', () => {
    for (const { level } of ALL_LEVELS) {
      const ids = level.questions.map((question) => question.id);
      expect(new Set(ids).size, `${level.id} has duplicate question ids`).toBe(ids.length);
    }
  });
});

describe('questions', () => {
  it('always explains the answer', () => {
    for (const { levelId, question } of allQuestions) {
      expect(
        question.explanation.trim().length,
        `${levelId}/${question.id} needs an explanation`,
      ).toBeGreaterThan(0);
      expect(question.prompt.trim().length, `${levelId}/${question.id} needs a prompt`).toBeGreaterThan(
        0,
      );
    }
  });

  it('points correctIndex at a real option', () => {
    for (const { levelId, question } of allQuestions) {
      if (question.kind !== 'mcq' && question.kind !== 'predict-output') continue;
      const where = `${levelId}/${question.id}`;
      expect(question.options.length, `${where} needs at least two options`).toBeGreaterThan(1);
      expect(question.correctIndex, `${where} correctIndex too low`).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex, `${where} correctIndex out of range`).toBeLessThan(
        question.options.length,
      );
      expect(new Set(question.options).size, `${where} has duplicate options`).toBe(
        question.options.length,
      );
    }
  });

  it('gives ordering puzzles something to order', () => {
    for (const { levelId, question } of allQuestions) {
      if (question.kind !== 'order') continue;
      expect(question.items.length, `${levelId}/${question.id} needs 2+ items`).toBeGreaterThan(1);
    }
  });

  it('matches every fill-in-the-blank template to its word banks', () => {
    for (const { levelId, question } of allQuestions) {
      if (question.kind !== 'fill-blank') continue;
      const where = `${levelId}/${question.id}`;

      const placeholders = [...question.template.matchAll(/\{\{(\d+)\}\}/g)].map((m) =>
        Number(m[1]),
      );
      expect(placeholders.length, `${where} template has no blanks`).toBeGreaterThan(0);
      expect(new Set(placeholders).size, `${where} repeats a placeholder`).toBe(placeholders.length);
      expect([...placeholders].sort((a, b) => a - b), `${where} placeholders must be 0..n`).toEqual(
        question.blanks.map((_, i) => i),
      );

      question.blanks.forEach((blank, i) => {
        expect(blank.choices.length, `${where} blank ${i} needs 2+ choices`).toBeGreaterThan(1);
        expect(blank.correctIndex, `${where} blank ${i} index too low`).toBeGreaterThanOrEqual(0);
        expect(blank.correctIndex, `${where} blank ${i} index out of range`).toBeLessThan(
          blank.choices.length,
        );
      });
    }
  });

  it('always shows a snippet with a predict-output question', () => {
    for (const { levelId, question } of allQuestions) {
      if (question.kind !== 'predict-output') continue;
      expect(question.code.trim().length, `${levelId}/${question.id} needs code`).toBeGreaterThan(0);
    }
  });
});

describe('code challenges', () => {
  const codeQuestions: Array<{ levelId: string; question: CodeQuestion }> = allQuestions.filter(
    (item): item is { levelId: string; question: CodeQuestion } => item.question.kind === 'code',
  );

  it('exist, so the game really does teach writing code', () => {
    expect(codeQuestions.length).toBeGreaterThan(10);
  });

  it('always has at least one test and a hint-free path to run', () => {
    for (const { levelId, question } of codeQuestions) {
      expect(question.tests.length, `${levelId}/${question.id} has no tests`).toBeGreaterThan(0);
      expect(
        question.solution.trim().length,
        `${levelId}/${question.id} has no solution`,
      ).toBeGreaterThan(0);
    }
  });

  // The important one: every authored answer is executed against its own tests.
  it.each(codeQuestions.map((item) => [`${item.levelId}/${item.question.id}`, item.question]))(
    'solution for %s passes its own tests',
    (_label, question) => {
      const report = executeAndTest((question as CodeQuestion).solution, (question as CodeQuestion).tests);
      expect(report.error).toBeNull();
      const failures = report.tests.filter((test) => !test.passed);
      expect(
        failures.map((f) => `${f.label}: expected ${f.expected}, got ${f.actual}`),
      ).toEqual([]);
      expect(report.allPassed).toBe(true);
    },
  );

  // Starter code is a starting point, not a free pass.
  it.each(codeQuestions.map((item) => [`${item.levelId}/${item.question.id}`, item.question]))(
    'starter code for %s does not already pass',
    (_label, question) => {
      const report = executeAndTest(
        (question as CodeQuestion).starterCode,
        (question as CodeQuestion).tests,
      );
      expect(report.allPassed).toBe(false);
    },
  );
});

describe('the sandbox itself', () => {
  it('captures console output in order', () => {
    const report = executeAndTest('console.log(1); console.log("two");', [
      { type: 'output', expectedLogs: ['1', 'two'] },
    ]);
    expect(report.logs).toEqual(['1', 'two']);
    expect(report.allPassed).toBe(true);
  });

  it('reports a syntax error instead of throwing', () => {
    const report = executeAndTest('function broken( {', [{ type: 'output', expectedLogs: [] }]);
    expect(report.error).toMatch(/SyntaxError/);
    expect(report.allPassed).toBe(false);
  });

  it('reports a thrown error instead of throwing', () => {
    const report = executeAndTest('throw new Error("boom");', [
      { type: 'output', expectedLogs: [] },
    ]);
    expect(report.error).toBe('Error: boom');
  });

  it('finds a function the player declared and calls it', () => {
    const report = executeAndTest('function double(n) { return n * 2; }', [
      { type: 'function', name: 'double', args: [4], expected: 8 },
    ]);
    expect(report.allPassed).toBe(true);
  });

  it('fails clearly when the required function is missing', () => {
    const report = executeAndTest('const x = 1;', [
      { type: 'function', name: 'double', args: [4], expected: 8 },
    ]);
    expect(report.tests[0].passed).toBe(false);
    expect(report.tests[0].actual).toMatch(/No function named double/);
  });

  it('compares objects and arrays by value, not by reference', () => {
    const report = executeAndTest('function f() { return { b: 2, a: 1 }; }', [
      { type: 'function', name: 'f', args: [], expected: { a: 1, b: 2 } },
    ]);
    expect(report.allPassed).toBe(true);
  });

  it('does not confuse the number 7 with the string "7"', () => {
    const report = executeAndTest('function f() { return "7"; }', [
      { type: 'function', name: 'f', args: [], expected: 7 },
    ]);
    expect(report.allPassed).toBe(false);
  });

  it('caps runaway output so the console cannot be flooded', () => {
    const report = executeAndTest(
      'for (let i = 0; i < 5000; i = i + 1) { console.log(i); }',
      [{ type: 'output', expectedLogs: ['0'] }],
    );
    expect(report.logs.length).toBe(500);
    expect(report.logsTruncated).toBe(true);
  });
});
