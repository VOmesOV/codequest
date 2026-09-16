import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { keymap } from '@codemirror/view';
import { Compartment, EditorState, Prec } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

export interface EditorApi {
  /**
   * Types `text` at the cursor, replacing any selection. `cursorOffset` says
   * where to leave the caret relative to the start of the insert, so a key that
   * inserts `${}` can drop the caret between the braces.
   */
  insert: (text: string, cursorOffset?: number) => void;
  /** Steps the caret by `delta` characters — how you get out from between brackets. */
  move: (delta: number) => void;
  focus: () => void;
}

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  onRun?: () => void;
  /** Handed the editor's imperative API once it has mounted. */
  onReady?: (api: EditorApi) => void;
}

/**
 * CodeMirror wrapper. Default-exported and loaded with `React.lazy`, so the
 * quiz-only chapters never download an editor they will not use.
 */
export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  onRun,
  onReady,
}: CodeEditorProps) {
  const host = useRef<HTMLDivElement | null>(null);
  const view = useRef<EditorView | null>(null);
  const readOnlyCompartment = useRef(new Compartment());

  // Callbacks live in refs so the editor is created once and never torn down
  // mid-typing just because the parent re-rendered.
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);
  const onReadyRef = useRef(onReady);
  onChangeRef.current = onChange;
  onRunRef.current = onRun;
  onReadyRef.current = onReady;

  useEffect(() => {
    if (!host.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        Prec.highest(
          keymap.of([
            {
              key: 'Mod-Enter',
              run: () => {
                onRunRef.current?.();
                return true;
              },
            },
          ]),
        ),
        basicSetup,
        javascript(),
        oneDark,
        EditorView.lineWrapping,
        readOnlyCompartment.current.of(EditorState.readOnly.of(readOnly)),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) onChangeRef.current(update.state.doc.toString());
        }),
      ],
    });

    const instance = new EditorView({ state, parent: host.current });
    view.current = instance;

    // Focus has to be restored *before* the dispatch, never after: focusing an
    // already-focused editor makes CodeMirror re-read the browser's selection
    // from the DOM, which would throw away the caret position we just set.
    const refocus = () => {
      if (!instance.hasFocus) instance.focus();
    };

    onReadyRef.current?.({
      insert: (text, cursorOffset) => {
        refocus();
        const { from, to } = instance.state.selection.main;
        instance.dispatch({
          changes: { from, to, insert: text },
          selection: { anchor: from + (cursorOffset ?? text.length) },
          scrollIntoView: true,
        });
      },
      move: (delta) => {
        refocus();
        const head = instance.state.selection.main.head;
        const target = Math.max(0, Math.min(instance.state.doc.length, head + delta));
        instance.dispatch({ selection: { anchor: target }, scrollIntoView: true });
      },
      focus: () => instance.focus(),
    });

    return () => {
      instance.destroy();
      view.current = null;
    };
    // Intentionally mount-only: `value` is synced by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only push the prop back into the document for external changes such as
  // "Reset code" or "Show solution" — never for the player's own keystrokes.
  useEffect(() => {
    const instance = view.current;
    if (!instance) return;
    const current = instance.state.doc.toString();
    if (current === value) return;
    instance.dispatch({ changes: { from: 0, to: current.length, insert: value } });
  }, [value]);

  useEffect(() => {
    const instance = view.current;
    if (!instance) return;
    instance.dispatch({
      effects: readOnlyCompartment.current.reconfigure(EditorState.readOnly.of(readOnly)),
    });
  }, [readOnly]);

  return <div className="editor" ref={host} />;
}
