import { useEffect, useRef, useState } from "react";

const GREEK = [..."ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ"];

/**
 * Decodes a word in a left-to-right wave: each letter cycles through Greek
 * glyphs, then locks to its final letter — a clean cipher resolve, no glitch
 * flicker once a character has settled.
 */
export function CipherText({
  text,
  className = "",
  run = true,
  delay = 0,
}: {
  text: string;
  className?: string;
  run?: boolean;
  delay?: number;
}) {
  const final = [...text];
  const [disp, setDisp] = useState<string[]>(() => final.map((c) => (c === " " ? " " : "")));
  const started = useRef(false);

  useEffect(() => {
    if (!run || started.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisp(final);
      return;
    }
    started.current = true;
    const perChar = 130; // wave stagger between letters
    const scramble = 520; // cipher time before a letter locks
    const t0 = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      const t = now - t0;
      const out = final.map((c, i) => {
        if (c === " ") return " ";
        const appear = i * perChar;
        const lock = appear + scramble;
        if (t < appear) return "";
        if (t >= lock) return c;
        return GREEK[(Math.random() * GREEK.length) | 0];
      });
      setDisp(out);
      if (t < final.length * perChar + scramble) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisp(final);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, delay]);

  return <span className={`cipher ${className}`.trim()}>{disp.join("")}</span>;
}
