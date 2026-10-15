import { useEffect, useState } from "react";
import "./Letter.css";

const LETTER_TEXT = `Happy Birthday ammaaaaaaaaaaaaaaaaaa😚💋.
You are not just my girlfriend, you are so much more than that.
You guide me when I’m lost, you teach me when I don’t know what to do, 
and you care for me in a way that makes me feel so lucky to have you in my life. 🥹🫂🫂.
Sometimes you take care of me like a mother, teach me like a father, 
and love me like the most precious person in your life😚🫂Whenever I’m with you, I feel like I don’t have to worry about anything because you take care of everything. 
You make me feel safe, understood, and loved. 🥹🫂I know I may not always say it, but I notice every little thing you do for me. Your care, your guidance, your patience, your scolding, your love everything means more to me than I can explain.On your birthday,
 I just want to say thank you for being YOU. Thank you for coming into my life and making it better🫂I promise I’ll always try to make you smile, 
 take care of you, stand beside you, and love you as much as I can 🫂And remember… you may take responsibility for me when I’m with you,
  but my heart has already taken responsibility for loving you forever amma 😚😚😚🫂`;

const CLOSING_LINE =
  "And if I could choose all over again, I'd still choose you.";

export default function Letter({ onNext, onRestart }) {
  const [typedText, setTypedText] = useState("");
  const [finished, setFinished] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (finished) return;

    let position = 0;

    const timer = window.setInterval(() => {
      position += 1;
      setTypedText(LETTER_TEXT.slice(0, position));

      if (position >= LETTER_TEXT.length) {
        window.clearInterval(timer);
        setFinished(true);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [finished]);

  const skipTyping = () => {
    setTypedText(LETTER_TEXT);
    setFinished(true);
  };

  return (
    <main className="page letter-page">
      <section className="letter-card">
        <p className="letter-eyebrow">A LITTLE SOMETHING FROM ME</p>

        <h1 className="script letter-heading">A Letter From My Heart 💌</h1>

        <div className="letter-paper">
          <div className="letter-copy">
            {typedText}
            {!finished && <span className="letter-cursor">|</span>}
          </div>
        </div>

        {!finished && (
          <button className="btn letter-skip" onClick={skipTyping}>
            Skip the typing ✨
          </button>
        )}

        {finished && (
          <div className="letter-finale">
            <div className="letter-confetti" aria-hidden="true">
              {Array.from({ length: 28 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    "--i": i,
                    "--x": `${(i * 37) % 100}%`,
                    "--delay": `${(i % 8) * 0.12}s`,
                  }}
                >
                  {i % 3 === 0 ? "♥" : i % 3 === 1 ? "✦" : "•"}
                </span>
              ))}
            </div>

            <div className="final-heart" aria-label="A beating heart">
              💗
            </div>

            <p className="letter-closing">{CLOSING_LINE}</p>

            <p className="letter-signature">
              Forever yours,
              <br />
              <span>Unikkanna ♡</span>
            </p>

            <div className="letter-actions">
              <button className="btn" onClick={onNext}>
                Back to my gifts
              </button>

              <button
                className="btn letter-replay"
                onClick={() => setShowConfirm(true)}
              >
                Replay from the start ↻
              </button>
            </div>
          </div>
        )}
      </section>

      {showConfirm && (
        <div
          className="letter-modal-backdrop"
          onClick={() => setShowConfirm(false)}
        >
          <section
            className="letter-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="restart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="letter-modal-heart">💗</div>

            <h2 id="restart-title">Start our story again?</h2>

            <p>
              Are you sure you want to replay everything from the beginning?
            </p>

            <div className="letter-modal-actions">
              <button
                className="btn"
                onClick={() => {
                  setShowConfirm(false);
                  onRestart();
                }}
              >
                Yes, start again
              </button>

              <button
                className="btn letter-replay"
                onClick={() => setShowConfirm(false)}
              >
                Not yet
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
