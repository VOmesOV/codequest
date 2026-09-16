import { useMemo, useState } from 'react';
import { ALL_LEVELS, CHAPTERS } from '../../content';
import type { Chapter, Level } from '../../types/content';
import { useProgress } from '../../state/ProgressContext';
import { Button, Modal, StarRating, XpBar } from '../ui';

export function ChapterMap({ onOpenLevel }: { onOpenLevel: (levelId: string) => void }) {
  const { progress, isUnlocked, recordFor, reset } = useProgress();
  const [showSettings, setShowSettings] = useState(false);

  const totalStars = useMemo(
    () => Object.values(progress.levels).reduce((sum, record) => sum + record.stars, 0),
    [progress.levels],
  );

  const nextLevel = useMemo(
    () => ALL_LEVELS.find((entry) => !progress.levels[entry.level.id]),
    [progress.levels],
  );

  return (
    <div className="map">
      <header className="map__header">
        <div className="map__brand">
          <span className="map__logo">{'</>'}</span>
          <div>
            <h1>CodeQuest</h1>
            <p>Learn to code from absolute zero</p>
          </div>
        </div>
        <div className="map__meters">
          <XpBar totalXp={progress.totalXp} />
          <div className="map__starcount">
            <span className="star star--on">★</span> {totalStars} / {ALL_LEVELS.length * 3}
          </div>
          <Button variant="quiet" onClick={() => setShowSettings(true)} aria-label="Settings">
            ⚙
          </Button>
        </div>
      </header>

      {nextLevel && (
        <button className="map__continue" onClick={() => onOpenLevel(nextLevel.level.id)}>
          <span className="map__continue-label">
            {progress.totalXp === 0 ? 'Start here' : 'Continue'}
          </span>
          <span className="map__continue-title">{nextLevel.level.title}</span>
          <span className="map__continue-arrow">→</span>
        </button>
      )}

      {!nextLevel && (
        <div className="map__continue map__continue--done">
          <span className="map__continue-title">
            🏆 Every level cleared. Replay any level to chase three stars.
          </span>
        </div>
      )}

      <div className="map__chapters">
        {CHAPTERS.map((chapter, chapterIndex) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            number={chapterIndex + 1}
            isUnlocked={isUnlocked}
            starsFor={(id) => recordFor(id)?.stars ?? 0}
            onOpenLevel={onOpenLevel}
          />
        ))}
      </div>

      {showSettings && (
        <Modal title="Settings" onClose={() => setShowSettings(false)}>
          <p className="modal__text">
            Progress is stored in this browser only — no account, no server. Clearing it cannot be
            undone.
          </p>
          <div className="modal__stats">
            <span>{Object.keys(progress.levels).length} levels cleared</span>
            <span>{progress.totalXp} XP</span>
            <span>{totalStars} stars</span>
          </div>
          <Button
            variant="danger"
            full
            onClick={() => {
              reset();
              setShowSettings(false);
            }}
          >
            Reset all progress
          </Button>
        </Modal>
      )}
    </div>
  );
}

function ChapterSection({
  chapter,
  number,
  isUnlocked,
  starsFor,
  onOpenLevel,
}: {
  chapter: Chapter;
  number: number;
  isUnlocked: (levelId: string) => boolean;
  starsFor: (levelId: string) => number;
  onOpenLevel: (levelId: string) => void;
}) {
  const chapterOpen = isUnlocked(chapter.levels[0].id);
  const cleared = chapter.levels.filter((level) => starsFor(level.id) > 0).length;

  return (
    <section className={`chapter ${chapterOpen ? '' : 'chapter--locked'}`}>
      <div className="chapter__head">
        <div className="chapter__icon">{chapter.icon}</div>
        <div className="chapter__text">
          <div className="chapter__eyebrow">Chapter {number}</div>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
        </div>
        <div className="chapter__count">
          {cleared}/{chapter.levels.length}
        </div>
      </div>

      <div className="chapter__levels">
        {chapter.levels.map((level, index) => (
          <LevelNode
            key={level.id}
            level={level}
            number={index + 1}
            locked={!isUnlocked(level.id)}
            stars={starsFor(level.id)}
            onOpen={() => onOpenLevel(level.id)}
          />
        ))}
      </div>
    </section>
  );
}

function LevelNode({
  level,
  number,
  locked,
  stars,
  onOpen,
}: {
  level: Level;
  number: number;
  locked: boolean;
  stars: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={[
        'node',
        level.boss ? 'node--boss' : '',
        locked ? 'node--locked' : '',
        stars > 0 ? 'node--done' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={locked}
      onClick={onOpen}
      title={locked ? 'Clear the previous level first' : level.concept}
    >
      <div className="node__badge">{locked ? '🔒' : level.boss ? '👑' : number}</div>
      <div className="node__body">
        <div className="node__title">{level.title}</div>
        <div className="node__concept">{level.concept}</div>
      </div>
      {!locked && <StarRating earned={stars} size="sm" />}
    </button>
  );
}
