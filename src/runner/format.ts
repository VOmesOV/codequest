/**
 * Value formatting shared by the sandbox worker and the content tests.
 *
 * Two separate jobs:
 *  - `formatArgs` renders a `console.log(...)` call the way a real console
 *    would, because that string is what the player compares against.
 *  - `canonical` produces a comparison key for return values, with object keys
 *    sorted so `{a:1,b:2}` and `{b:2,a:1}` count as the same answer.
 */

export function formatValue(value: unknown, nested = false): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  switch (typeof value) {
    case 'string':
      // Top-level strings print bare; inside a structure they get quotes.
      return nested ? `'${value.replace(/'/g, "\\'")}'` : value;
    case 'number':
      return Object.is(value, -0) ? '-0' : String(value);
    case 'boolean':
    case 'bigint':
      return String(value);
    case 'function': {
      const name = (value as { name?: string }).name;
      return name ? `[Function: ${name}]` : '[Function (anonymous)]';
    }
    case 'symbol':
      return String(value);
  }

  if (Array.isArray(value)) {
    return `[ ${value.map((item) => formatValue(item, true)).join(', ')} ]`.replace('[  ]', '[]');
  }
  if (value instanceof Error) {
    return `${value.name}: ${value.message}`;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) return '{}';
  return `{ ${entries.map(([k, v]) => `${k}: ${formatValue(v, true)}`).join(', ')} }`;
}

export function formatArgs(args: unknown[]): string {
  return args.map((arg) => formatValue(arg)).join(' ');
}

/** Stable stringification used for equality checks. */
export function canonical(value: unknown): string {
  if (value === undefined) return '«undefined»';
  if (typeof value === 'number' && Number.isNaN(value)) return '«NaN»';
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? String(value);

  if (Array.isArray(value)) {
    return `[${value.map(canonical).join(',')}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
    a < b ? -1 : a > b ? 1 : 0,
  );
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`;
}
