import { useState } from "react";
import "./Bouquet.css";

function Flower({ x, y, color, delay = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g
        style={{
          animation: `flowerBloom 0.8s ${delay}s both`,
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-12"
            rx="7"
            ry="12"
            fill={color}
            stroke="#fff0f4"
            strokeWidth="0.6"
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle r="6" fill="#f7c96c" />
        <circle r="2" fill="#b76b43" />
      </g>
    </g>
  );
}

export default function Bouquet({ onNext, onRestart }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <main className="page bouquet-page">
      <section className="card bouquet-card">
        <span className="bouquet-sticker">♡ a little something for you ♡</span>

        <h1 className="script bouquet-title">Just for you...</h1>

        <p className="caption">
          {revealed
            ? "A bouquet for my favourite person 🌷"
            : "I picked these flowers just for you"}
        </p>

        <div className={`bouquet-art ${revealed ? "revealed" : ""}`}>
          <div className="bouquet-sparkles" aria-hidden="true">
            <span>✦</span>
            <span>♡</span>
            <span>✧</span>
            <span>♥</span>
            <span>✦</span>
          </div>

          <svg
            className="bouquet-svg"
            viewBox="0 0 300 330"
            role="img"
            aria-label="A pink and red bouquet of flowers wrapped in paper"
          >
            <defs>
              <linearGradient id="wrap" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff2cf" />
                <stop offset="100%" stopColor="#f0c9a6" />
              </linearGradient>
              <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff9bb4" />
                <stop offset="100%" stopColor="#d6204c" />
              </linearGradient>
            </defs>

            {/* Flower stems */}
            <g
              fill="none"
              stroke="#668b58"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <path d="M150 250 L83 95" />
              <path d="M150 250 L115 72" />
              <path d="M150 250 L151 65" />
              <path d="M150 250 L189 82" />
              <path d="M150 250 L222 112" />
              <path d="M150 250 L70 145" />
              <path d="M150 250 L232 155" />
            </g>

            {/* Leaves */}
            <g fill="#7ca76c">
              <ellipse
                cx="104"
                cy="185"
                rx="24"
                ry="9"
                transform="rotate(28 104 185)"
              />
              <ellipse
                cx="181"
                cy="190"
                rx="25"
                ry="9"
                transform="rotate(-30 181 190)"
              />
              <ellipse
                cx="121"
                cy="147"
                rx="22"
                ry="8"
                transform="rotate(-35 121 147)"
              />
              <ellipse
                cx="196"
                cy="151"
                rx="23"
                ry="8"
                transform="rotate(35 196 151)"
              />
              <ellipse
                cx="144"
                cy="205"
                rx="23"
                ry="8"
                transform="rotate(25 144 205)"
              />
            </g>

            {/* Bouquet wrapping */}
            <path
              d="M45 135 L150 195 L255 135 L201 276 L150 299 L99 276 Z"
              fill="url(#wrap)"
              stroke="#e5b9a5"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M45 135 L150 195 L150 299 L99 276 Z"
              fill="#f8dfbd"
              opacity="0.7"
            />
            <path
              d="M255 135 L150 195 L201 276 Z"
              fill="#f3d1b6"
              opacity="0.8"
            />

            {/* Flower heads */}
            <g className="bouquet-flowers">
              <Flower x={83} y={95} color="#e84970" delay={0.1} scale={1.05} />
              <Flower x={115} y={72} color="#ff8eaa" delay={0.2} scale={1.1} />
              <Flower x={151} y={65} color="#d6204c" delay={0.3} scale={1.2} />
              <Flower x={189} y={82} color="#ffb2c3" delay={0.4} scale={1.1} />
              <Flower x={222} y={112} color="#e84970" delay={0.5} scale={1} />
              <Flower x={70} y={145} color="#ff9bb4" delay={0.6} scale={0.85} />
              <Flower
                x={232}
                y={155}
                color="#f0648b"
                delay={0.7}
                scale={0.85}
              />
            </g>

            {/* Ribbon */}
            <path
              d="M112 237 Q150 221 188 237 L178 254 Q150 243 122 254 Z"
              fill="url(#ribbon)"
            />
            <path d="M143 245 L119 281 L147 271 L155 246" fill="#e84970" />
            <path d="M157 245 L185 281 L157 271 L149 246" fill="#d6204c" />
            <ellipse cx="150" cy="241" rx="12" ry="10" fill="#ff8eaa" />
            <circle cx="150" cy="241" r="4" fill="#d6204c" />
          </svg>
        </div>

        <div className="bouquet-message">
          <p className="script">
            {revealed
              ? "For you, always ♡"
              : "A little love, wrapped in flowers"}
          </p>
        </div>

        {!revealed ? (
          <button className="btn bouquet-btn" onClick={() => setRevealed(true)}>
            Open your bouquet 💐
          </button>
        ) : (
          <button className="btn bouquet-btn" onClick={onNext}>
            One more surprise →
          </button>
        )}

        <button className="bouquet-back" onClick={onRestart}>
          Start again ↺
        </button>
      </section>
    </main>
  );
}
