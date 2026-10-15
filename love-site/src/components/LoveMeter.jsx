// Semicircle meter: 5 coloured sections light up as value grows; needle sweeps smoothly.
const COLORS = ["#ffc2d1", "#ff9db3", "#ff708f", "#f0456d", "#d6204c"];
const CX = 100,
  CY = 100,
  R = 80;
const pt = (deg) => [
  CX + R * Math.cos((deg * Math.PI) / 180),
  CY - R * Math.sin((deg * Math.PI) / 180),
];

export default function LoveMeter({ value }) {
  const needle = -90 + value * 1.8; // 0% = far left, 100% = far right
  return (
    <div className="meter">
      <svg
        viewBox="0 0 200 115"
        role="img"
        aria-label={`Love meter at ${value}%`}
      >
        {COLORS.map((c, i) => {
          const [x1, y1] = pt(180 - i * 36 - 2);
          const [x2, y2] = pt(180 - (i + 1) * 36 + 2);
          return (
            <path
              key={c}
              d={`M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}`}
              stroke={c}
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              style={{
                opacity: value > i * 20 ? 1 : 0.25,
                transition: "opacity .4s",
              }}
            />
          );
        })}
        <g
          className="needle"
          style={{
            transform: `rotate(${needle}deg)`,
            transformOrigin: `${CX}px ${CY}px`,
          }}
        >
          <path d="M100 100 L97 30 L100 22 L103 30 Z" fill="#7a3b4a" />
        </g>
        <circle cx={CX} cy={CY} r="7" fill="#7a3b4a" />
      </svg>
      <div className="meter-value">{value}%</div>
    </div>
  );
}
