import type { CodeTest } from '../types/content';
import { executeAndTest } from './execute';

/**
 * The sandbox. A worker has no access to the DOM, and — crucially — the main
 * thread can `terminate()` it, which is the only reliable way to stop a
 * `while (true) {}`. A fresh worker is created per run, so nothing a previous
 * run did can leak into the next one.
 *
 * Typed by hand instead of pulling in the "WebWorker" lib, which collides with
 * "DOM" in a project that also has React components.
 */
const ctx = self as unknown as {
  onmessage: ((event: { data: { code: string; tests: CodeTest[] } }) => void) | null;
  postMessage: (message: unknown) => void;
};

ctx.onmessage = (event) => {
  const { code, tests } = event.data;
  ctx.postMessage(executeAndTest(code, tests));
};
