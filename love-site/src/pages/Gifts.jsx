import { useEffect, useRef, useState } from "react";
import CuteCharacter from "../components/CuteCharacter.jsx";
import GiftBox from "../components/GiftBox.jsx";
import Confetti from "../components/Confetti.jsx";

// Story order: flowers, then video, then letter.
const GIFTS = [
  {
    id: "bouquet",
    theme: "pink",
    label: "Open me first",
    name: "bouquet",
    delay: 0,
  },
  {
    id: "video",
    theme: "red",
    label: "Then me",
    name: "video message",
    delay: 0.5,
  },
  {
    id: "letter",
    theme: "cream",
    label: "Last one",
    name: "letter",
    delay: 1,
  },
];

const OPEN_MS = 1350;

const HINT = "Tap a gift to open it 🎁";
const LOCKED_HINT = "That one is waiting for the gift before it 🔒";

export default function Gifts({ opened = [], onOpenGift }) {
  const [opening, setOpening] = useState(null);
  const [hint, setHint] = useState(HINT);
  const [nudge, setNudge] = useState(null);

  const timers = useRef([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const allOpened = GIFTS.every((gift) => opened.includes(gift.id));

  const statusOf = (gift, index) => {
    if (opening === gift.id) return "opening";
    if (opened.includes(gift.id)) return "opened";

    const unlocked = index === 0 || opened.includes(GIFTS[index - 1].id);

    return unlocked ? "ready" : "locked";
  };

  const tap = (gift, status) => {
    if (opening) return;

    if (status === "locked") {
      setHint(LOCKED_HINT);
      setNudge(gift.id);

      timers.current.push(
        setTimeout(() => {
          setNudge(null);
          setHint(
            GIFTS.every((item) => opened.includes(item.id))
              ? "You opened everything 💖"
              : HINT,
          );
        }, 1800),
      );

      return;
    }

    // Previously opened gifts can be revisited immediately.
    if (status === "opened") {
      onOpenGift(gift.id);
      return;
    }

    setOpening(gift.id);

    timers.current.push(
      setTimeout(() => {
        setOpening(null);
        onOpenGift(gift.id);
      }, OPEN_MS),
    );
  };

  return (
    <section className="card gifts-card">
      <Confetti />

      <CuteCharacter mood="happy" arms size={96} />

      <h1 className="script">You passed the love test</h1>

      <p className="subtitle">
        {allOpened
          ? "You opened everything 💖"
          : "Your surprises are waiting for you"}
      </p>

      <div className="gifts">
        {GIFTS.map((gift, index) => {
          const status = statusOf(gift, index);

          return (
            <GiftBox
              key={gift.id}
              theme={gift.theme}
              label={gift.label}
              status={status}
              delay={gift.delay}
              nudge={nudge === gift.id}
              ariaLabel={`${gift.label}: ${gift.name}${
                status === "locked"
                  ? " (locked)"
                  : status === "opened"
                    ? " (opened, tap to revisit)"
                    : ""
              }`}
              onTap={() => tap(gift, status)}
            />
          );
        })}
      </div>

      <p className="caption" aria-live="polite">
        {allOpened ? "Every surprise is yours ♡" : hint}
      </p>
    </section>
  );
}
