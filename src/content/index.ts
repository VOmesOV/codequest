import type { Chapter, Level } from '../types/content';
import { chapter01 } from './chapter-01';
import { chapter02 } from './chapter-02';
import { chapter03 } from './chapter-03';
import { chapter04 } from './chapter-04';
import { chapter05 } from './chapter-05';
import { chapter06 } from './chapter-06';
import { chapter07 } from './chapter-07';
import { chapter08 } from './chapter-08';

/**
 * The one registry. Array order *is* progression order — a level unlocks when
 * the one before it is cleared, which makes each chapter's boss its gate for
 * free. To add content: write a `Level`, push it into a chapter; to add a
 * chapter: write the file and add one line here.
 */
export const CHAPTERS: Chapter[] = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
];

export interface LevelEntry {
  level: Level;
  chapter: Chapter;
  indexInChapter: number;
  globalIndex: number;
}

export const ALL_LEVELS: LevelEntry[] = CHAPTERS.flatMap((chapter) =>
  chapter.levels.map((level, indexInChapter) => ({
    level,
    chapter,
    indexInChapter,
    globalIndex: 0,
  })),
).map((entry, globalIndex) => ({ ...entry, globalIndex }));

const BY_ID = new Map(ALL_LEVELS.map((entry) => [entry.level.id, entry]));

export function findLevel(levelId: string): LevelEntry | undefined {
  return BY_ID.get(levelId);
}
