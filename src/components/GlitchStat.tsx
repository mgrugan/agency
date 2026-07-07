import { useEffect, useRef, useState } from "react";

const ROMANS = ["I", "V", "X", "L", "C", "D", "M"];
const KEEP = new Set([" ", ".", "+", "%", ",", "M", "K", "B"]);

/**
 * A stat that resolves in a glitchy Roman → number wave: each character
 * flickers through Roman numerals, then locks to its final glyph, staggered
 * left-to-right, with occasional post-lock glitch flickers.
 */
export function GlitchStat({
  value,
  label,
  run,
  delay = 0,
}: {
  value: string;
  label: string;
  run: boolean;
  delay?: number;
}) {
  const final = [...value];
  const [disp, setDisp] = useState<string[]>(() => final.map(() => ""));
  const started = useRef(false);

  useEffect(() => {
    if (!run || started.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisp(final);
      return;
    }
    started.current = true;
    const perChar = 95; // wave stagger
    const scramble = 300; // scramble time before a char locks
    const t0 = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      const t = now - t0;
      const out = final.map((c, i) => {
        const appear = i * perChar;
        const lock = appear + scramble;
        if (t < appear) return "";
        if (t >= lock) {
          return Math.random() < 0.015 ? ROMANS[(Math.random() * ROMANS.length) | 0] : c;
        }
        if (KEEP.has(c)) return c;
        return ROMANS[(Math.random() * ROMANS.length) | 0];
      });
      setDisp(out);
      if (t < final.length * perChar + scramble + 500) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisp(final);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, delay]);

  return (
    <div className="hstat">
      <div className="v glitch">{disp.join("")}</div>
      <div className="k">{label}</div>
    </div>
  );
}
