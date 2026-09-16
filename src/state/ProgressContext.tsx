import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ALL_LEVELS } from '../content';
import type { LevelRecord, SavedProgress, Stars } from '../types/progress';
import {
  applyLevelResult,
  clearProgress,
  emptyProgress,
  loadProgress,
  saveProgress,
} from './progress';
import type { LevelOutcome } from './progress';

interface ProgressApi {
  progress: SavedProgress;
  completeLevel: (outcome: LevelOutcome) => { xpGained: number; stars: Stars; improved: boolean };
  reset: () => void;
  isUnlocked: (levelId: string) => boolean;
  recordFor: (levelId: string) => LevelRecord | undefined;
  completedCount: number;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<SavedProgress>(() => loadProgress());

  const completeLevel = useCallback((outcome: LevelOutcome) => {
    let summary = { xpGained: 0, stars: 1 as Stars, improved: false };
    setProgress((current) => {
      const applied = applyLevelResult(current, outcome);
      summary = { xpGained: applied.xpGained, stars: applied.stars, improved: applied.improved };
      saveProgress(applied.progress);
      return applied.progress;
    });
    return summary;
  }, []);

  const reset = useCallback(() => {
    clearProgress();
    setProgress(emptyProgress());
  }, []);

  const value = useMemo<ProgressApi>(() => {
    // Unlocking is derived from the registry order rather than stored, so
    // reordering or renaming content can never leave a save inconsistent.
    // The chapter gate falls out of this for free: a chapter's boss is its last
    // level, so you cannot reach the next chapter without clearing it.
    const isUnlocked = (levelId: string) => {
      const index = ALL_LEVELS.findIndex((entry) => entry.level.id === levelId);
      if (index <= 0) return index === 0;
      return Boolean(progress.levels[ALL_LEVELS[index - 1].level.id]);
    };

    return {
      progress,
      completeLevel,
      reset,
      isUnlocked,
      recordFor: (levelId: string) => progress.levels[levelId],
      completedCount: Object.keys(progress.levels).length,
    };
  }, [progress, completeLevel, reset]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used inside <ProgressProvider>');
  return context;
}
