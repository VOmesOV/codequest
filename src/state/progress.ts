import type { SavedProgress, Stars } from '../types/progress';

const STORAGE_KEY = 'codequest.v1';

export function emptyProgress(): SavedProgress {
  return { version: 1, totalXp: 0, levels: {} };
}

/**
 * Never throws and never returns junk. A corrupted save should drop the player
 * back to a fresh game, not to a white screen — and private-mode browsers where
 * localStorage throws on access must still be able to play.
 */
export function loadProgress(): SavedProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();

    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      (parsed as SavedProgress).version !== 1 ||
      typeof (parsed as SavedProgress).levels !== 'object' ||
      (parsed as SavedProgress).levels === null
    ) {
      return emptyProgress();
    }

    const candidate = parsed as SavedProgress;
    const levels: SavedProgress['levels'] = {};
    for (const [id, record] of Object.entries(candidate.levels)) {
      if (
        record &&
        typeof record === 'object' &&
        (record.stars === 1 || record.stars === 2 || record.stars === 3) &&
        typeof record.bestScore === 'number'
      ) {
        levels[id] = {
          stars: record.stars,
          bestScore: clamp(record.bestScore),
          completedAt: typeof record.completedAt === 'string' ? record.completedAt : '',
        };
      }
    }

    return {
      version: 1,
      totalXp: Number.isFinite(candidate.totalXp) ? Math.max(0, Math.round(candidate.totalXp)) : 0,
      levels,
    };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: SavedProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full or blocked — the session still plays, it just won't persist.
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do.
  }
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function starsFor(averageScore: number): Stars {
  if (averageScore >= 90) return 3;
  if (averageScore >= 60) return 2;
  return 1;
}

export function xpFor(averageScore: number, baseXp: number): number {
  return Math.round((baseXp * clamp(averageScore)) / 100);
}

export interface LevelOutcome {
  levelId: string;
  averageScore: number;
  baseXp: number;
}

/**
 * Applies a finished level to the save.
 *
 * Replaying can only ever help you: stars are kept at their best and XP is
 * awarded on the *improvement*, so grinding an easy level adds nothing.
 */
export function applyLevelResult(
  progress: SavedProgress,
  outcome: LevelOutcome,
): { progress: SavedProgress; xpGained: number; stars: Stars; improved: boolean } {
  const score = clamp(outcome.averageScore);
  const previous = progress.levels[outcome.levelId];
  const previousScore = previous?.bestScore ?? 0;
  const bestScore = Math.max(previousScore, score);

  const xpGained = Math.max(
    0,
    xpFor(bestScore, outcome.baseXp) - xpFor(previousScore, outcome.baseXp),
  );

  return {
    progress: {
      ...progress,
      totalXp: progress.totalXp + xpGained,
      levels: {
        ...progress.levels,
        [outcome.levelId]: {
          stars: starsFor(bestScore),
          bestScore,
          completedAt: new Date().toISOString(),
        },
      },
    },
    xpGained,
    stars: starsFor(score),
    improved: !previous || score > previousScore,
  };
}
