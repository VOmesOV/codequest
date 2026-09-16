import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import type { CodeQuestion } from '../../types/content';
import { runCode } from '../../runner/codeRunner';
import type { RunReport } from '../../runner/codeRunner';
import type { EditorApi } from '../editor/CodeEditor';
import { Button } from '../ui';
import type { QuestionViewProps } from './types';

const CodeEditor = lazy(() => import('../editor/CodeEditor'));

/** After this many failed runs the player can read a worked answer (for 0 points). */
const SOLUTION_AFTER_ATTEMPTS = 3;

/**
 * A phone keyboard buries `{`, `}`, `;` and `$` two layers deep, which turns
 * every exercise into a typing endurance test. These are the characters this
 * curriculum actually needs, one tap away. Shown only on touch devices (CSS).
 *
 * Single characters rather than pairs: the editor already closes a bracket for
 * you when you type the opening one, and inserting a pair from here would only
 * strand the caret between them. The arrow keys are how you step back out.
 */
type SymbolKey =
  | { label: string; insert: string; caret?: number; move?: never }
  | { label: string; move: number; insert?: never; caret?: never };

const SYMBOL_KEYS: SymbolKey[] = [
  { label: '(', insert: '(' },
  { label: ')', insert: ')' },
  { label: '{', insert: '{' },
  { label: '}', insert: '}' },
  { label: '←', move: -1 },
  { label: '→', move: 1 },
  { label: ';', insert: ';' },
  { label: '"', insert: '"' },
  { label: '=', insert: ' = ' },
  { label: '===', insert: ' === ' },
  { label: '+', insert: ' + ' },
  { label: '-', insert: ' - ' },
  { label: '*', insert: ' * ' },
  { label: '/', insert: ' / ' },
  { label: '%', insert: ' % ' },
  { label: '<', insert: ' < ' },
  { label: '>', insert: ' > ' },
  { label: '[', insert: '[' },
  { label: ']', insert: ']' },
  { label: '&&', insert: ' && ' },
  { label: '||', insert: ' || ' },
  { label: '`', insert: '`' },
  { label: '${}', insert: '${}', caret: 2 },
  { label: '⇥', insert: '  ' },
];

interface CodeChallengeProps extends QuestionViewProps<CodeQuestion> {
  attempts: number;
  solutionShown: boolean;
  onShowSolution: () => void;
}

export function CodeChallenge({
  question,
  draft,
  status,
  attempts,
  solutionShown,
  onChange,
  onSubmit,
  onShowSolution,
}: CodeChallengeProps) {
  const source = draft && draft.kind === 'code' ? draft.source : question.starterCode;
  const [report, setReport] = useState<RunReport | null>(null);
  const [running, setRunning] = useState(false);
  const locked = status === 'correct';

  // Keep the freshest source available to the Ctrl+Enter handler without
  // re-creating the editor on every keystroke.
  const sourceRef = useRef(source);
  sourceRef.current = source;

  const editorApi = useRef<EditorApi | null>(null);
  const onEditorReady = useCallback((api: EditorApi) => {
    editorApi.current = api;
  }, []);

  useEffect(() => {
    if (!draft || draft.kind !== 'code') {
      onChange({ kind: 'code', source: question.starterCode, passed: false });
    }
  }, [draft, onChange, question.starterCode]);

  // A new question means a clean console.
  useEffect(() => {
    setReport(null);
    setRunning(false);
  }, [question.id]);

  const run = async () => {
    if (running || locked) return;
    setRunning(true);
    const result = await runCode(sourceRef.current, question.tests);
    setReport(result);
    setRunning(false);
    onSubmit({ kind: 'code', source: sourceRef.current, passed: result.allPassed });
  };

  const setSource = (value: string) => onChange({ kind: 'code', source: value, passed: false });

  return (
    <div className="code-challenge">
      <div className="code-challenge__editor">
        <Suspense fallback={<div className="editor editor--loading">Loading editor…</div>}>
          <CodeEditor
            value={source}
            onChange={setSource}
            readOnly={locked}
            onRun={run}
            onReady={onEditorReady}
          />
        </Suspense>
      </div>

      {!locked && (
        <div className="keypad" role="group" aria-label="Insert a symbol">
          {SYMBOL_KEYS.map((key) => (
            <button
              key={key.label}
              type="button"
              className="keycap"
              // The editor must keep focus, or the keyboard closes on every tap.
              onMouseDown={(event) => event.preventDefault()}
              onClick={() =>
                key.move !== undefined
                  ? editorApi.current?.move(key.move)
                  : editorApi.current?.insert(key.insert, key.caret)
              }
            >
              {key.label}
            </button>
          ))}
        </div>
      )}

      <div className="code-challenge__actions">
        <Button variant="success" onClick={run} disabled={running || locked}>
          {running ? 'Running…' : locked ? 'Passed ✓' : '▶ Run code'}
        </Button>
        {!locked && (
          <Button variant="quiet" onClick={() => setSource(question.starterCode)}>
            Reset code
          </Button>
        )}
        {!locked && !solutionShown && attempts >= SOLUTION_AFTER_ATTEMPTS && (
          <Button
            variant="quiet"
            onClick={() => {
              onShowSolution();
              setSource(question.solution);
            }}
          >
            Show me the answer
          </Button>
        )}
        <span className="code-challenge__shortcut">Ctrl + Enter</span>
      </div>

      {solutionShown && !locked && (
        <p className="code-challenge__note">
          This is a working answer. Read it, then run it — and try to explain each line to yourself
          before moving on.
        </p>
      )}

      {report && (
        <div className="console">
          <div className="console__head">Console</div>
          <div className="console__body">
            {report.logs.length === 0 && !report.error && (
              <div className="console__line console__line--dim">
                (your program did not print anything)
              </div>
            )}
            {report.logs.map((line, i) => (
              <div key={i} className="console__line">
                {line}
              </div>
            ))}
            {report.logsTruncated && (
              <div className="console__line console__line--dim">
                … output stopped after 500 lines
              </div>
            )}
            {report.error && <div className="console__line console__line--error">{report.error}</div>}
          </div>
        </div>
      )}

      {report && report.tests.length > 0 && (
        <ul className="tests">
          {report.tests.map((test) => (
            <li key={test.index} className={`test ${test.passed ? 'test--pass' : 'test--fail'}`}>
              <span className="test__icon">{test.passed ? '✓' : '✕'}</span>
              <div className="test__body">
                <code className="test__label">{test.label}</code>
                {!test.passed && (
                  <div className="test__diff">
                    <div>
                      <span className="test__diff-key">Expected</span>
                      <pre>{test.expected}</pre>
                    </div>
                    <div>
                      <span className="test__diff-key">Your code gave</span>
                      <pre>{test.actual}</pre>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
