import { useCallback, useEffect, useState } from 'react';
import { ALL_LEVELS, findLevel } from './content';
import { ChapterMap } from './components/map/ChapterMap';
import { LevelPlayer } from './components/level/LevelPlayer';

type Screen = { view: 'map' } | { view: 'level'; levelId: string; attempt: number };

export function App() {
  const [screen, setScreen] = useState<Screen>({ view: 'map' });

  const openLevel = useCallback((levelId: string) => {
    setScreen({ view: 'level', levelId, attempt: 0 });
  }, []);

  const backToMap = useCallback(() => setScreen({ view: 'map' }), []);

  // Starting a level should not leave you halfway down the map you scrolled.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [screen]);

  if (screen.view === 'map') {
    return <ChapterMap onOpenLevel={openLevel} />;
  }

  const entry = findLevel(screen.levelId);
  if (!entry) {
    return <ChapterMap onOpenLevel={openLevel} />;
  }

  const next = ALL_LEVELS[entry.globalIndex + 1];

  return (
    <LevelPlayer
      // Bumping the key throws away all run state — that is what "Replay" means.
      key={`${entry.level.id}#${screen.attempt}`}
      level={entry.level}
      chapter={entry.chapter}
      hasNext={Boolean(next)}
      onExit={backToMap}
      onNext={() => next && openLevel(next.level.id)}
      onReplay={() =>
        setScreen({ view: 'level', levelId: entry.level.id, attempt: screen.attempt + 1 })
      }
    />
  );
}
