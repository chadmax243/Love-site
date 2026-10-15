import { motion, useReducedMotion } from "framer-motion";

const COLORS = [
  "#ff708f",
  "#ffc2d1",
  "#d6204c",
  "#fff0d9",
  "#ff9db3",
  "#f5c26b",
];
// Deterministic pieces so renders stay pure
const PIECES = Array.from({ length: 28 }, (_, i) => ({
  dx: ((i * 53) % 100) * 3.2 - 160, // horizontal spread, px
  up: 70 + ((i * 29) % 90), // how high the burst goes
  fall: 300 + ((i * 41) % 260), // how far it drifts down
  rot: ((i * 97) % 720) - 360,
  size: 6 + (i % 4) * 2,
  color: COLORS[i % COLORS.length],
  round: i % 3 === 0,
  delay: (i % 7) * 0.03,
}));

// Light one-shot confetti burst from just under the heading
export default function Confetti() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {PIECES.map((p, i) => (
        <motion.span
          key={i}
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 1.6,
            background: p.color,
            borderRadius: p.round ? "50%" : 2,
          }}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
          animate={{
            x: [0, p.dx * 0.7, p.dx],
            y: [0, -p.up, p.fall],
            opacity: [0, 1, 1, 0],
            rotate: p.rot,
          }}
          transition={{
            duration: 2.4,
            delay: 0.25 + p.delay,
            ease: "easeOut",
            times: [0, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}
