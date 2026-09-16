import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  applyLevelResult,
  emptyProgress,
  loadProgress,
  saveProgress,
  starsFor,
  xpFor,
} from '../src/state/progress';

/** A minimal localStorage so the persistence layer can be tested in Node. */
function installStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
  });
  return store;
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe('starsFor', () => {
  it('uses the documented thresholds', () => {
    expect(starsFor(100)).toBe(3);
    expect(starsFor(90)).toBe(3);
    expect(starsFor(89)).toBe(2);
    expect(starsFor(60)).toBe(2);
    expect(starsFor(59)).toBe(1);
    expect(starsFor(0)).toBe(1);
  });
});

describe('xpFor', () => {
  it('scales the level reward by accuracy', () => {
    expect(xpFor(100, 50)).toBe(50);
    expect(xpFor(50, 50)).toBe(25);
    expect(xpFor(0, 50)).toBe(0);
  });
});

describe('applyLevelResult', () => {
  it('records a first clear and awards the full XP', () => {
    const { progress, xpGained, stars } = applyLevelResult(emptyProgress(), {
      levelId: 'ch01-l01',
      averageScore: 100,
      baseXp: 50,
    });
    expect(xpGained).toBe(50);
    expect(stars).toBe(3);
    expect(progress.totalXp).toBe(50);
    expect(progress.levels['ch01-l01'].bestScore).toBe(100);
  });

  it('only pays out the improvement when a level is replayed better', () => {
    const first = applyLevelResult(emptyProgress(), {
      levelId: 'ch01-l01',
      averageScore: 50,
      baseXp: 50,
    });
    expect(first.xpGained).toBe(25);

    const second = applyLevelResult(first.progress, {
      levelId: 'ch01-l01',
      averageScore: 100,
      baseXp: 50,
    });
    expect(second.xpGained).toBe(25);
    expect(second.progress.totalXp).toBe(50);
  });

  it('never downgrades stars or pays out for a worse replay', () => {
    const good = applyLevelResult(emptyProgress(), {
      levelId: 'ch01-l01',
      averageScore: 100,
      baseXp: 50,
    });
    const worse = applyLevelResult(good.progress, {
      levelId: 'ch01-l01',
      averageScore: 30,
      baseXp: 50,
    });

    expect(worse.xpGained).toBe(0);
    expect(worse.progress.totalXp).toBe(50);
    expect(worse.progress.levels['ch01-l01'].stars).toBe(3);
    expect(worse.progress.levels['ch01-l01'].bestScore).toBe(100);
  });
});

describe('loadProgress', () => {
  it('starts fresh when nothing is stored', () => {
    installStorage();
    expect(loadProgress()).toEqual(emptyProgress());
  });

  it('round-trips a save', () => {
    installStorage();
    const saved = applyLevelResult(emptyProgress(), {
      levelId: 'ch02-l01',
      averageScore: 80,
      baseXp: 50,
    }).progress;
    saveProgress(saved);
    expect(loadProgress()).toEqual(saved);
  });

  it('falls back to a fresh game rather than throwing on corrupt data', () => {
    installStorage({ 'codequest.v1': '{not json at all' });
    expect(loadProgress()).toEqual(emptyProgress());
  });

  it('ignores a save from an unknown version', () => {
    installStorage({ 'codequest.v1': JSON.stringify({ version: 99, totalXp: 5, levels: {} }) });
    expect(loadProgress()).toEqual(emptyProgress());
  });

  it('drops malformed level records but keeps the good ones', () => {
    installStorage({
      'codequest.v1': JSON.stringify({
        version: 1,
        totalXp: 40,
        levels: {
          good: { stars: 2, bestScore: 70, completedAt: 'x' },
          bad: { stars: 9, bestScore: 'lots' },
          alsoBad: null,
        },
      }),
    });
    const loaded = loadProgress();
    expect(Object.keys(loaded.levels)).toEqual(['good']);
    expect(loaded.totalXp).toBe(40);
  });

  it('survives storage that throws, as in a locked-down browser', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {},
    });
    expect(loadProgress()).toEqual(emptyProgress());
    expect(() => saveProgress(emptyProgress())).not.toThrow();
  });
});
