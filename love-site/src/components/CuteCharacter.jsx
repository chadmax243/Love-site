// Simple SVG bear. mood: "happy" | "sad" | "shocked"
// arms: raise both arms in celebration
export default function CuteCharacter({
  mood = "happy",
  size = 120,
  arms = false,
}) {
  const mouth = {
    happy: "M42 66 Q50 74 58 66",
    sad: "M42 72 Q50 64 58 72",
    shocked: "M46 68 Q50 76 54 68 Q50 64 46 68",
  }[mood];
  return (
    <svg
      className="bounce"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Cute bear"
    >
      {arms && (
        <g>
          <path
            d="M20 76 L8 40"
            stroke="#f2b8b0"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M80 76 L92 40"
            stroke="#f2b8b0"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle cx="8" cy="38" r="3.2" fill="#e8a5a0" />
          <circle cx="92" cy="38" r="3.2" fill="#e8a5a0" />
        </g>
      )}
      <circle cx="24" cy="26" r="12" fill="#e8a5a0" />
      <circle cx="76" cy="26" r="12" fill="#e8a5a0" />
      <circle cx="24" cy="26" r="6" fill="#ffd9e2" />
      <circle cx="76" cy="26" r="6" fill="#ffd9e2" />
      <circle cx="50" cy="55" r="34" fill="#f2b8b0" />
      <ellipse cx="50" cy="64" rx="14" ry="10" fill="#ffe9ee" />
      <circle cx="38" cy="50" r="3.5" fill="#5a3a3a" />
      <circle cx="62" cy="50" r="3.5" fill="#5a3a3a" />
      <ellipse cx="30" cy="60" rx="5" ry="3" fill="#ff9db3" opacity=".7" />
      <ellipse cx="70" cy="60" rx="5" ry="3" fill="#ff9db3" opacity=".7" />
      <ellipse cx="50" cy="60" rx="3.5" ry="2.5" fill="#5a3a3a" />
      <path
        d={mouth}
        stroke="#5a3a3a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M44 22 L50 26 L56 22 L56 30 L50 26 L44 30 Z" fill="#e63e62" />
      <circle cx="50" cy="26" r="3" fill="#c42a4d" />
    </svg>
  );
}
