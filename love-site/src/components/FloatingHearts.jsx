// Decorative hearts drifting up behind the content (pure CSS animation)
const HEARTS = Array.from({ length: 10 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 14 + ((i * 7) % 16),
  delay: (i * 1.3) % 8,
  dur: 9 + (i % 5) * 2,
}));
export default function FloatingHearts() {
  return (
    <div className="hearts" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.dur}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
