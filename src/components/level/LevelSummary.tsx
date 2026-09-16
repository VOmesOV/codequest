import type { Level } from '../../types/content';
import type { QuestionResult, Stars } from '../../types/progress';
import { Button, StarRating } from '../ui';

const HEADLINE: Record<Stars, string> = {
  3: 'Flawless!',
  2: 'Level cleared!',
  1: 'You made it through!',
};

export function LevelSummary({
  level,
  results,
  averageScore,
  stars,
  xpGained,
  hasNext,
  onNext,
  onReplay,
  onExit,
}: {
  level: Level;
  results: QuestionResult[];
  averageScore: number;
  stars: Stars;
  xpGained: number;
  hasNext: boolean;
  onNext: () => void;
  onReplay: () => void;
  onExit: () => void;
}) {
  const perfect = results.filter((r) => r.attempts === 0 && r.hintsUsed === 0 && !r.solutionShown);

  return (
    <div className="summary">
      <div className="summary__hero">
        <StarRating earned={stars} size="lg" animate />
        <h2>{HEADLINE[stars]}</h2>
        <p className="summary__subtitle">{level.title}</p>
      </div>

      <div className="summary__stats">
        <div className="stat">
          <div className="stat__value">+{xpGained}</div>
          <div className="stat__label">XP earned</div>
        </div>
        <div className="stat">
          <div className="stat__value">{averageScore}%</div>
          <div className="stat__label">Accuracy</div>
        </div>
        <div className="stat">
          <div className="stat__value">
            {perfect.length}/{results.length}
          </div>
          <div className="stat__label">First try</div>
        </div>
      </div>

      {stars < 3 && (
        <p className="summary__tip">
          Replay any time for three stars — answering first try with no hints is what earns them.
        </p>
      )}

      <ul className="summary__list">
        {results.map((result, i) => (
          <li key={result.questionId} className="summary__row">
            <span className="summary__index">{i + 1}</span>
            <span className="summary__question">{result.title}</span>
            <span className={`summary__score summary__score--${bucket(result.score)}`}>
              {result.solutionShown
                ? 'answer shown'
                : result.attempts === 0 && result.hintsUsed === 0
                  ? 'first try'
                  : `${result.attempts} retr${result.attempts === 1 ? 'y' : 'ies'}${
                      result.hintsUsed ? `, ${result.hintsUsed} hint` : ''
                    }`}
            </span>
          </li>
        ))}
      </ul>

      <div className="summary__actions">
        <Button variant="quiet" onClick={onExit}>
          Back to map
        </Button>
        <Button variant="ghost" onClick={onReplay}>
          Replay
        </Button>
        {hasNext && <Button onClick={onNext}>Next level →</Button>}
      </div>
    </div>
  );
}

function bucket(score: number): string {
  if (score >= 100) return 'high';
  if (score >= 50) return 'mid';
  return 'low';
}
