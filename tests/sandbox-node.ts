import vm from 'node:vm';
import {
  LOOKUP_EXPRESSION,
  describeError,
  executeAndTest,
} from '../src/runner/execute';
import type { Evaluator, RunReport } from '../src/runner/execute';
import type { CodeTest } from '../src/types/content';

/** Mirrors the browser's 2s worker deadline. */
const NODE_TIMEOUT_MS = 2000;

/**
 * The browser stops runaway code by terminating a Worker, which Node cannot do
 * in-process — a spinning loop blocks the event loop, so vitest's own timeout
 * would never fire. `node:vm` can interrupt the script itself, which is what
 * lets the content lint safely execute starter code that loops forever on
 * purpose (chapter 5 teaches exactly that mistake).
 */
export const vmEvaluator: Evaluator = (code, sandboxConsole) => {
  try {
    const context = vm.createContext({ console: sandboxConsole });
    const script = new vm.Script(`${code}\n;${LOOKUP_EXPRESSION}`);
    const result = script.runInContext(context, { timeout: NODE_TIMEOUT_MS }) as unknown;

    if (typeof result !== 'function') {
      return { lookup: null, error: 'Unexpected `return` outside of a function.' };
    }
    return { lookup: result as (name: string) => unknown, error: null };
  } catch (err) {
    return { lookup: null, error: describeError(err) };
  }
};

export function runInNode(code: string, tests: CodeTest[]): RunReport {
  return executeAndTest(code, tests, vmEvaluator);
}
