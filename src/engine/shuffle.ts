/**
 * Deterministic shuffling.
 *
 * Options and orderable items are shuffled so the player learns the content
 * rather than the position of the right answer — but the shuffle is seeded from
 * the question id so it stays stable across re-renders. A random shuffle would
 * reorder the buttons underneath the player's finger on every keystroke.
 */

function hashString(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns the display order as indices into the original array.
 * `seededOrder(3, 'q1')` might give `[2, 0, 1]`.
 */
export function seededOrder(length: number, seed: string): number[] {
  const order = Array.from({ length }, (_, i) => i);
  const random = mulberry32(hashString(seed));
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  // An "ordering" puzzle that happens to shuffle into the right answer is not a puzzle.
  if (length > 1 && order.every((value, index) => value === index)) {
    [order[0], order[1]] = [order[1], order[0]];
  }
  return order;
}
