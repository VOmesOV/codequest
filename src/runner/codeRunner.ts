import type { CodeTest } from '../types/content';
import type { RunReport } from './execute';

export type { RunReport, TestOutcome } from './execute';

/** Long enough for any beginner exercise, short enough that a hang feels like a hiccup. */
export const RUN_TIMEOUT_MS = 2000;

export const TIMEOUT_MESSAGE =
  'Your code ran too long and was stopped. Do you have a loop that never ends?';

/**
 * Runs the player's code in a throwaway worker and gives up after a deadline.
 *
 * The timeout is the whole point: an infinite loop cannot be interrupted from
 * inside, so we kill the worker from out here and hand back a friendly report.
 */
export function runCode(code: string, tests: CodeTest[]): Promise<RunReport> {
  return new Promise((resolve) => {
    let worker: Worker;
    try {
      worker = new Worker(new URL('./runner.worker.ts', import.meta.url), { type: 'module' });
    } catch {
      resolve({
        logs: [],
        logsTruncated: false,
        error: 'Could not start the code sandbox in this browser.',
        tests: [],
        allPassed: false,
      });
      return;
    }

    let settled = false;
    const finish = (report: RunReport) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      resolve(report);
    };

    const timer = setTimeout(() => {
      finish({
        logs: [],
        logsTruncated: false,
        error: TIMEOUT_MESSAGE,
        tests: tests.map((test, index) => ({
          index,
          label: test.description ?? (test.type === 'output' ? 'Output check' : `${test.name}(…)`),
          passed: false,
          expected: '—',
          actual: 'Stopped: ran too long',
        })),
        allPassed: false,
        timedOut: true,
      });
    }, RUN_TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent<RunReport>) => finish(event.data);
    worker.onerror = (event) => {
      finish({
        logs: [],
        logsTruncated: false,
        error: event.message || 'Something went wrong while running your code.',
        tests: [],
        allPassed: false,
      });
    };

    worker.postMessage({ code, tests });
  });
}
