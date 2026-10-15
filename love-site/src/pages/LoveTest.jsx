import { useState } from "react";
import CuteCharacter from "../components/CuteCharacter.jsx";
import LoveMeter from "../components/LoveMeter.jsx";
import Button from "../components/Button.jsx";

export default function LoveTest({ love, setLove, onNext }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const mood = love < 40 ? "sad" : love < 90 ? "shocked" : "happy";

  const caption =
    love < 40
      ? "Hmm... that is not much 🥺"
      : love < 90
        ? "Is that all? Try again 👀"
        : "Now we are talking 💖";

  const handleChange = (event) => {
    setLove(Number(event.target.value));
    setHasInteracted(true);
  };

  return (
    <section className="card">
      <CuteCharacter mood={mood} size={110} />

      <h1 className="script">How much do you love me?</h1>

      <LoveMeter value={love} />

      <p className="caption">{caption}</p>

      <div className="love-slider-wrap">
        <div className="love-slider-labels">
          <span>A little 🥺</span>
          <span>With all my heart 💖</span>
        </div>

        <div className="love-slider-track">
          <input
            className="slider love-slider"
            type="range"
            min="0"
            max="100"
            value={love}
            onChange={handleChange}
            onKeyUp={() => setHasInteracted(true)}
            onPointerUp={() => setHasInteracted(true)}
            aria-label="Choose how much you love me"
            aria-valuetext={`${love}% love`}
          />

          {!hasInteracted && (
            <div className="drag-hint" aria-hidden="true">
              <span className="drag-hint-arrow">↔</span>
              <span>Drag me!</span>
              <span>💗</span>
            </div>
          )}
        </div>

        <p className="love-slider-help">
          {hasInteracted
            ? `You chose ${love}% love 💕`
            : "Slide the heart to choose your answer"}
        </p>
      </div>

      <Button onClick={onNext}>Continue</Button>
    </section>
  );
}
