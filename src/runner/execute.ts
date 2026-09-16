import type { CodeTest } from '../types/content';
import { canonical, formatArgs, formatValue } from './format';

export interface TestOutcome {
  index: number;
  label: string;
  passed: boolean;
  expected: string;
  actual: string;
}

export interface RunReport {
  logs: string[];
  logsTruncated: boolean;
  /** A top-level crash: syntax error, thrown exception, timeout. */
  error: string | null;
  tests: TestOutcome[];
  allPassed: boolean;
  timedOut?: boolean;
}

/** A runaway `console.log` inside a loop must not be able to freeze the UI. */
const MAX_LOGS = 500;

export function describeError(err: unknown): string {
  if (err instanceof Error) {
    return err.message ? `${err.name}: ${err.message}` : err.name;
  }
  return String(err);
}

export type SandboxConsole = Record<string, (...args: unknown[]) => void>;

export interface EvaluationResult {
  /** Reads a top-level binding the player declared, or `undefined` if there is none. */
  lookup: ((name: string) => unknown) | null;
  error: string | null;
}

export type Evaluator = (code: string, sandboxConsole: SandboxConsole) => EvaluationResult;

/**
 * Appended to the player's code so their top-level declarations can be reached
 * afterwards: a direct `eval` keeps the surrounding scope alive, so a
 * `function double(n) {…}` they wrote stays reachable by name.
 */
export const LOOKUP_EXPRESSION =
  '(function (__name) { try { return eval(__name); } catch (__e) { return undefined; } })';

/**
 * The browser evaluator. It is safe to run without a step limit only because it
 * executes inside a Worker that the main thread can terminate — see
 * `codeRunner.ts`. Anywhere else, supply an evaluator that enforces a timeout.
 */
export const functionEvaluator: Evaluator = (code, sandboxConsole) => {
  try {
    const factory = new Function('console', `${code}\n;return ${LOOKUP_EXPRESSION};`);
    const result = factory(sandboxConsole) as unknown;
    if (typeof result !== 'function') {
      return { lookup: null, error: 'Unexpected `return` outside of a function.' };
    }
    return { lookup: result as (name: string) => unknown, error: null };
  } catch (err) {
    return { lookup: null, error: describeError(err) };
  }
};

/**
 * Runs the player's code and checks it against the level's tests.
 *
 * Kept free of any Worker or DOM dependency so the exact same function can
 * verify every authored solution from Node (`tests/content.test.ts`), which
 * passes in a `vm`-based evaluator to get its own timeout.
 */
export function executeAndTest(
  code: string,
  tests: CodeTest[],
  evaluate: Evaluator = functionEvaluator,
): RunReport {
  const logs: string[] = [];
  let logsTruncated = false;

  const record = (args: unknown[]) => {
    if (logs.length >= MAX_LOGS) {
      logsTruncated = true;
      return;
    }
    logs.push(formatArgs(args));
  };

  const sandboxConsole: SandboxConsole = {
    log: (...args) => record(args),
    info: (...args) => record(args),
    warn: (...args) => record(args),
    error: (...args) => record(args),
    debug: (...args) => record(args),
    table: (...args) => record(args),
  };

  const { lookup, error } = evaluate(code, sandboxConsole);

  // Output tests compare only what the program printed on its own, before any
  // test harness started calling functions.
  const initialLogs = [...logs];

  const outcomes: TestOutcome[] = tests.map((test, index) => {
    const label =
      test.description ??
      (test.type === 'output'
        ? 'Your program prints the right thing'
        : `${test.name}(${test.args.map((a) => formatValue(a, true)).join(', ')})`);

    if (error || !lookup) {
      return { index, label, passed: false, expected: '—', actual: 'Code did not run' };
    }

    if (test.type === 'output') {
      const expected = test.expectedLogs.join('\n');
      const actual = initialLogs.join('\n');
      return {
        index,
        label,
        passed: expected === actual,
        expected: expected || '(nothing)',
        actual: actual || '(nothing printed)',
      };
    }

    const target = lookup(test.name);
    if (typeof target !== 'function') {
      return {
        index,
        label,
        passed: false,
        expected: formatValue(test.expected, true),
        actual: `No function named ${test.name} was found`,
      };
    }

    try {
      const returned = (target as (...args: unknown[]) => unknown)(...test.args);
      return {
        index,
        label,
        passed: canonical(returned) === canonical(test.expected),
        expected: formatValue(test.expected, true),
        actual: formatValue(returned, true),
      };
    } catch (err) {
      return {
        index,
        label,
        passed: false,
        expected: formatValue(test.expected, true),
        actual: describeError(err),
      };
    }
  });

  return {
    logs,
    logsTruncated,
    error,
    tests: outcomes,
    allPassed: error === null && outcomes.length > 0 && outcomes.every((t) => t.passed),
  };
}
