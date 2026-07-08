import { useEffect, useRef, useState } from "react";

const GREEK = [..."ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ"];

/**
 * Decodes a word in a left-to-right wave: each letter cycles through Greek
 * glyphs, then locks to its final letter — a clean cipher resolve, no glitch
 * flicker once a character has settled. Returns the current display string so
 * several layers can share one synced animation.
 */
export function useCipher(text: string, { delay = 0, run = true }: { delay?: number; run?: boolean } = {}) {
  const final = [...text];
  const [disp, setDisp] = useState<string>(() => final.map((c) => (c === " " ? " " : "")).join(""));
  const started = useRef(false);

  useEffect(() => {
    if (!run || started.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisp(text);
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
      setDisp(out.join(""));
      if (t < final.length * perChar + scramble) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisp(text);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, delay]);

  return disp;
}

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
  const disp = useCipher(text, { delay, run });
  return <span className={`cipher ${className}`.trim()}>{disp}</span>;
}
