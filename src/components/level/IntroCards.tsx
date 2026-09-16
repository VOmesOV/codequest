import type { Level } from '../../types/content';
import { Button, RichText } from '../ui';

/** The short teaching beat before the questions — read, then get tested on it. */
export function IntroCards({
  level,
  index,
  onNext,
  onSkip,
}: {
  level: Level;
  index: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const cards = level.intro ?? [];
  const isLast = index === cards.length - 1;

  return (
    <div className="intro">
      <div className="intro__badge">{level.concept}</div>
      <div className="intro__card" key={index}>
        <p>
          <RichText text={cards[index]} />
        </p>
      </div>

      <div className="intro__dots">
        {cards.map((_, i) => (
          <span key={i} className={`dot ${i === index ? 'dot--on' : ''}`} />
        ))}
      </div>

      <div className="intro__actions">
        {!isLast && (
          <Button variant="quiet" onClick={onSkip}>
            Skip
          </Button>
        )}
        <Button onClick={onNext}>{isLast ? "Let's go" : 'Next'}</Button>
      </div>
    </div>
  );
}
