import { Fragment } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/* ---- Text with inline `code` --------------------------------------------- */

/**
 * Renders backtick spans in authored prompts as real code. Content is written
 * by us, but it still goes through React's escaping — never innerHTML.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split('`');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="inline-code">
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/* ---- Code display -------------------------------------------------------- */

const KEYWORDS =
  'const|let|var|function|return|if|else|for|while|do|of|in|new|typeof|break|continue|true|false|null|undefined|class|this';

const TOKEN_PATTERN = new RegExp(
  [
    '(\\/\\/[^\\n]*)', // 1 line comment
    "('(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\"|`(?:\\\\.|[^`\\\\])*`)", // 2 string
    `\\b(${KEYWORDS})\\b`, // 3 keyword
    '\\b(\\d+(?:\\.\\d+)?)\\b', // 4 number
    '([A-Za-z_$][\\w$]*)(?=\\s*\\()', // 5 call
  ].join('|'),
  'g',
);

/** Good-enough highlighting for read-only snippets. The editor uses CodeMirror. */
function highlight(code: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push(code.slice(lastIndex, index));

    const [whole, comment, string, keyword, num, call] = match;
    const className = comment
      ? 'tok-comment'
      : string
        ? 'tok-string'
        : keyword
          ? 'tok-keyword'
          : num
            ? 'tok-number'
            : call
              ? 'tok-call'
              : '';

    nodes.push(
      <span key={key++} className={className}>
        {whole}
      </span>,
    );
    lastIndex = index + whole.length;
  }

  if (lastIndex < code.length) nodes.push(code.slice(lastIndex));
  return nodes;
}

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="code-block">
      {label && <div className="code-block__label">{label}</div>}
      <pre>
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}

/* ---- Buttons ------------------------------------------------------------- */

type Variant = 'primary' | 'ghost' | 'success' | 'danger' | 'quiet';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  full?: boolean;
}

export function Button({ variant = 'primary', full, className, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={['btn', `btn--${variant}`, full ? 'btn--full' : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  );
}

/* ---- Stars and XP -------------------------------------------------------- */

export function StarRating({
  earned,
  size = 'md',
  animate = false,
}: {
  earned: number;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}) {
  return (
    <div className={`stars stars--${size}`} aria-label={`${earned} out of 3 stars`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`star ${n <= earned ? 'star--on' : 'star--off'} ${
            animate && n <= earned ? 'star--pop' : ''
          }`}
          style={animate ? { animationDelay: `${n * 0.18}s` } : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/** XP levels grow gently: 100, 250, 450, 700 … so early progress feels fast. */
export function rankFromXp(totalXp: number): { rank: number; into: number; needed: number } {
  let rank = 1;
  let remaining = totalXp;
  let needed = 100;
  while (remaining >= needed) {
    remaining -= needed;
    rank += 1;
    needed += 50;
  }
  return { rank, into: remaining, needed };
}

export function XpBar({ totalXp }: { totalXp: number }) {
  const { rank, into, needed } = rankFromXp(totalXp);
  const percent = Math.round((into / needed) * 100);
  return (
    <div className="xpbar">
      <div className="xpbar__badge">Rank {rank}</div>
      <div className="xpbar__track">
        <div className="xpbar__fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="xpbar__count">{totalXp} XP</div>
    </div>
  );
}

/* ---- Modal --------------------------------------------------------------- */

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <div className="modal__head">
          <h2>{title}</h2>
          <Button variant="quiet" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
