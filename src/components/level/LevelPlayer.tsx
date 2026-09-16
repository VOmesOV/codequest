import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import type { Answer, Chapter, Level } from '../../types/content';
import type { Stars } from '../../types/progress';
import { gradeAnswer, isAnswerComplete } from '../../engine/grading';
import { averageScore, initLevelState, levelReducer } from '../../engine/levelEngine';
import { useProgress } from '../../state/ProgressContext';
import { Button, RichText } from '../ui';
import { FeedbackPanel } from './FeedbackPanel';
import { IntroCards } from './IntroCards';
import { LevelSummary } from './LevelSummary';
import { QuestionFrame } from './QuestionFrame';

export function LevelPlayer({
  level,
  chapter,
  hasNext,
  onExit,
  onNext,
  onReplay,
}: {
  level: Level;
  chapter: Chapter;
  hasNext: boolean;
  onExit: () => void;
  onNext: () => void;
  /** App remounts the player with a fresh key, which resets every bit of run state. */
  onReplay: () => void;
}) {
  const [state, dispatch] = useReducer(levelReducer, level, initLevelState);
  const { completeLevel } = useProgress();
  const [award, setAward] = useState<{ stars: Stars; xpGained: number } | null>(null);

  // A level must only ever be banked once per run, even though React may
  // re-run this effect (StrictMode in development does exactly that).
  const bankedFor = useRef<string | null>(null);

  const question = state.level.questions[state.questionIndex];
  const isLastQuestion = state.questionIndex === state.level.questions.length - 1;
  const average = averageScore(state.results);

  useEffect(() => {
    if (state.phase !== 'summary') return;
    const runKey = `${level.id}:${state.results.length}`;
    if (bankedFor.current === runKey) return;
    bankedFor.current = runKey;
    const result = completeLevel({
      levelId: level.id,
      averageScore: average,
      baseXp: level.baseXp,
    });
    setAward({ stars: result.stars, xpGained: result.xpGained });
  }, [state.phase, state.results.length, level.id, level.baseXp, average, completeLevel]);

  // The draft is mirrored in a ref that is written synchronously as the player
  // acts, so checking an answer never depends on a re-render having landed
  // first — pick an option and hit Enter in the same instant and it still works.
  const draftRef = useRef<Answer | null>(null);
  useEffect(() => {
    draftRef.current = null;
  }, [state.questionIndex]);

  const setDraft = useCallback((draft: Answer) => {
    draftRef.current = draft;
    dispatch({ type: 'set-draft', draft });
  }, []);

  const submit = useCallback(
    (explicit?: Answer) => {
      const answer = explicit ?? draftRef.current;
      if (explicit) setDraft(explicit);
      dispatch({ type: 'submit', correct: gradeAnswer(question, answer) });
    },
    [question, setDraft],
  );

  // Enter is "the obvious key": check an answer, or move on once it is right.
  useEffect(() => {
    if (state.phase !== 'question') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || event.ctrlKey || event.metaKey || event.shiftKey) return;
      // Not every keydown target is an Element (window and document fire too).
      const target = event.target;
      if (target instanceof Element && target.closest('.cm-editor')) return;
      event.preventDefault();
      if (state.status === 'correct') dispatch({ type: 'next-question' });
      else if (question.kind !== 'code' && isAnswerComplete(question, draftRef.current)) submit();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state.phase, state.status, question, submit]);

  if (state.phase === 'intro') {
    return (
      <div className="player">
        <LevelHeader level={level} chapter={chapter} onExit={onExit} progress={0} total={0} />
        <div className="player__stage">
          <IntroCards
            level={level}
            index={state.introIndex}
            onNext={() => dispatch({ type: 'advance-intro' })}
            onSkip={() => dispatch({ type: 'skip-intro' })}
          />
        </div>
      </div>
    );
  }

  if (state.phase === 'summary') {
    return (
      <div className="player">
        <LevelHeader
          level={level}
          chapter={chapter}
          onExit={onExit}
          progress={state.level.questions.length}
          total={state.level.questions.length}
        />
        <div className="player__stage">
          <LevelSummary
            level={level}
            results={state.results}
            averageScore={average}
            stars={award?.stars ?? 1}
            xpGained={award?.xpGained ?? 0}
            hasNext={hasNext}
            onNext={onNext}
            onReplay={onReplay}
            onExit={onExit}
          />
        </div>
      </div>
    );
  }

  const hints = question.hints ?? [];
  const revealed = hints.slice(0, state.hintsUsed);
  const canCheck = isAnswerComplete(question, state.draft) && state.status !== 'correct';

  return (
    <div className="player">
      <LevelHeader
        level={level}
        chapter={chapter}
        onExit={onExit}
        progress={state.questionIndex}
        total={state.level.questions.length}
      />

      <div className="player__stage">
        <QuestionFrame
          question={question}
          draft={state.draft}
          status={state.status}
          ruledOut={state.ruledOut}
          attempts={state.attempts}
          solutionShown={state.solutionShown}
          onChange={setDraft}
          onSubmit={submit}
          onShowSolution={() => dispatch({ type: 'show-solution' })}
        />

        {revealed.length > 0 && (
          <div className="hints">
            {revealed.map((hint, i) => (
              <div key={i} className="hints__item">
                <span className="hints__icon">💡</span>
                <span>
                  <RichText text={hint} />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="player__footer">
        <FeedbackPanel
          question={question}
          status={state.status}
          attempts={state.attempts}
          hintsUsed={state.hintsUsed}
          onContinue={() => dispatch({ type: 'next-question' })}
          onHint={() => dispatch({ type: 'use-hint' })}
          isLastQuestion={isLastQuestion}
        />

        {state.status !== 'correct' && (
          <div className="player__controls">
            {hints.length > state.hintsUsed && (
              <Button variant="quiet" onClick={() => dispatch({ type: 'use-hint' })}>
                Hint ({hints.length - state.hintsUsed} left)
              </Button>
            )}
            {question.kind !== 'code' && (
              <Button onClick={() => submit()} disabled={!canCheck}>
                Check answer
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LevelHeader({
  level,
  chapter,
  onExit,
  progress,
  total,
}: {
  level: Level;
  chapter: Chapter;
  onExit: () => void;
  progress: number;
  total: number;
}) {
  return (
    <header className="player__header">
      <Button variant="quiet" onClick={onExit} aria-label="Back to map">
        ←
      </Button>
      <div className="player__titles">
        <div className="player__chapter">
          {chapter.icon} {chapter.title}
        </div>
        <div className="player__level">
          {level.boss && <span className="boss-tag">BOSS</span>}
          {level.title}
        </div>
      </div>
      {total > 0 && (
        <div className="player__dots" aria-label={`Question ${progress + 1} of ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`qdot ${i < progress ? 'qdot--done' : ''} ${i === progress ? 'qdot--current' : ''}`}
            />
          ))}
        </div>
      )}
    </header>
  );
}
