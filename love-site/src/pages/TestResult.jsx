import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import CuteCharacter from "../components/CuteCharacter.jsx";
import LoveMeter from "../components/LoveMeter.jsx";
import Button from "../components/Button.jsx";
import Confetti from "../components/Confetti.jsx";

// Smoothly counts the shown number toward the target
function useCountUp(target) {
  const [n, setN] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now(),
      a = from.current;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / 800, 1);
      const v = Math.round(a + (target - a) * p);
      setN(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return n;
}

// Page 2: reacts to the chosen value, then climbs to 100%
export default function TestResult({ love, onNext }) {
  const stages = useMemo(() => {
    const first =
      love < 30
        ? "That hurts..."
        : love < 70
          ? "Half? Seriously?"
          : "Hmm, almost...";
    const steps = [
      [40, "Try again..."],
      [60, "Getting warmer..."],
      [80, "Okay, I am listening 🥺"],
      [95, "So close!"],
    ];
    return [
      ...(love === 100 ? [] : [{ pct: love, msg: first }]),
      ...steps.filter(([p]) => p > love).map(([pct, msg]) => ({ pct, msg })),
      { pct: 100, msg: "Correct answer! 100%" },
    ];
  }, [love]);

  const [i, setI] = useState(0);
  const stage = stages[i];
  const done = i === stages.length - 1;
  const shown = useCountUp(stage.pct);

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setI((x) => x + 1), 1800);
    return () => clearTimeout(t);
  }, [i, done]);

  const mood = done ? "happy" : stage.pct < 60 ? "sad" : "shocked";
  return (
    <section className="card">
      {done && <Confetti />}
      <CuteCharacter mood={mood} cheer={done} size={110} />
      <motion.h1
        key={stage.msg}
        className="script"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {stage.msg}
      </motion.h1>
      <LoveMeter value={shown} />
      {done ? (
        <Button onClick={onNext}>Open my surprises</Button>
      ) : (
        <p className="caption">Checking...</p>
      )}
    </section>
  );
}
