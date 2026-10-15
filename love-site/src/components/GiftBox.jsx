import { motion } from "framer-motion";

// Colour themes for the three boxes
const THEMES = {
  pink: {
    body: "#ff9db3",
    shade: "#f27c98",
    lid: "#ffb3c6",
    ribbon: "#fff8f3",
    ribbonShade: "#ffe3ea",
  },
  red: {
    body: "#e63e62",
    shade: "#c42a4d",
    lid: "#f0587a",
    ribbon: "#ffe9ee",
    ribbonShade: "#ffc2d1",
  },
  cream: {
    body: "#fff0d9",
    shade: "#f3d9b4",
    lid: "#fff8ec",
    ribbon: "#ff708f",
    ribbonShade: "#d6204c",
    outline: "#e6c896",
  },
};

// Sparkles + hearts that fly out when a box opens
const PARTICLES = Array.from({ length: 11 }, (_, i) => {
  const a = (i / 11) * Math.PI * 2 - Math.PI / 2;
  const r = 46 + (i % 3) * 16;
  return {
    x: Math.cos(a) * r,
    y: Math.sin(a) * r - 8,
    glyph: i % 3 === 0 ? "♥" : "✦",
    heart: i % 3 === 0,
  };
});

function Burst() {
  return (
    <div className="burst" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className={p.heart ? "burst-heart" : "burst-spark"}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: [0, 1.3, 0.8], opacity: [1, 1, 0] }}
          transition={{ duration: 0.95, delay: 0.38, ease: "easeOut" }}
        >
          {p.glyph}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * One gift box.
 * status: 'locked' | 'ready' | 'opening' | 'opened'
 */
export default function GiftBox({
  theme,
  label,
  status,
  delay = 0,
  nudge = false,
  onTap,
  ariaLabel,
}) {
  const t = THEMES[theme];
  const isOpen = status === "opening" || status === "opened";
  return (
    <div className="gift" style={{ "--d": `${delay}s` }}>
      <div className="gift-wrap">
        <button
          type="button"
          className={`gift-btn ${status}${nudge ? " nudge" : ""}`}
          onClick={onTap}
          aria-label={ariaLabel}
          aria-disabled={status === "locked" || status === "opening"}
        >
          <span className="gift-float">
            <span className="gift-shake">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                {isOpen && (
                  <path
                    className="gift-heart"
                    d="M50 54 C28 40 36 22 50 33 C64 22 72 40 50 54 Z"
                    fill="#ff4d73"
                  />
                )}
                {/* body */}
                <rect
                  x="14"
                  y="46"
                  width="72"
                  height="44"
                  rx="6"
                  fill={t.body}
                  stroke={t.outline}
                  strokeWidth="1.5"
                />
                <rect
                  x="14"
                  y="78"
                  width="72"
                  height="12"
                  rx="6"
                  fill={t.shade}
                  opacity=".55"
                />
                <rect x="44" y="46" width="12" height="44" fill={t.ribbon} />
                {/* lid + bow */}
                <g className="gift-lid">
                  <rect
                    x="8"
                    y="32"
                    width="84"
                    height="18"
                    rx="5"
                    fill={t.lid}
                    stroke={t.outline}
                    strokeWidth="1.5"
                  />
                  <rect x="44" y="32" width="12" height="18" fill={t.ribbon} />
                  <ellipse
                    cx="38"
                    cy="26"
                    rx="12"
                    ry="8"
                    transform="rotate(-22 38 26)"
                    fill={t.ribbon}
                    stroke={t.ribbonShade}
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="62"
                    cy="26"
                    rx="12"
                    ry="8"
                    transform="rotate(22 62 26)"
                    fill={t.ribbon}
                    stroke={t.ribbonShade}
                    strokeWidth="2"
                  />
                  <circle cx="50" cy="29" r="5" fill={t.ribbonShade} />
                </g>
              </svg>
            </span>
          </span>
          {status === "locked" && (
            <span className="gift-badge lock" aria-hidden="true">
              🔒
            </span>
          )}
          {status === "opened" && (
            <span className="gift-badge tick" aria-hidden="true">
              ✓
            </span>
          )}
        </button>
        {status === "opening" && <Burst />}
      </div>
      <span className="gift-tag">{label}</span>
    </div>
  );
}
