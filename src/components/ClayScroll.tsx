import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

/** Waypoints the ball bounces between, in viewport fractions. Alternating
 *  sides keep it out of the centre reading column. Index 0 is the hero. */
const WAY = [
  { x: 0.73, y: 0.5 }, // hero — where the statue stands
  { x: 0.87, y: 0.26 },
  { x: 0.13, y: 0.62 },
  { x: 0.88, y: 0.36 },
  { x: 0.12, y: 0.3 },
  { x: 0.82, y: 0.64 },
  { x: 0.15, y: 0.42 },
  { x: 0.85, y: 0.5 },
];

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * The sculpture IS the scroll actor. In the hero a clean, crisp cut-out
 * statue stands over the emerald disc (transparent PNG — no video, no box).
 * As you scroll out of the hero it shrinks and dissolves, and a real ball
 * of clay takes its place, then bounces from section to section behind all
 * content, tracking scroll depth. Fixed at z-0 so it sits behind copy;
 * opaque cards occlude it. Fades to a quiet ambient past the hero.
 */
export function ClayScroll() {
  const statueRef = useRef<HTMLImageElement | null>(null);
  const discRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<HTMLDivElement | null>(null);
  const [hasStatue, setHasStatue] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const ball = ballRef.current;
      if (!ball) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const y = window.scrollY;
      const gp = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      const heroP = Math.min(1, Math.max(0, y / (vh * 0.85)));

      // path position
      const segF = gp * (WAY.length - 1);
      const i = Math.min(WAY.length - 2, Math.floor(segF));
      const f = reduced ? segF - i : easeInOut(segF - i);
      const a = WAY[i];
      const b = WAY[i + 1];
      const cx = (a.x + (b.x - a.x) * f) * vw;
      const hop = reduced ? 0 : Math.abs(Math.sin(segF * Math.PI)) * Math.min(58, vh * 0.06);
      const cy = (a.y + (b.y - a.y) * f) * vh - hop;

      const ballSize = Math.max(140, Math.min(vw * 0.15, 208));
      ball.style.width = `${ballSize}px`;
      ball.style.height = `${ballSize}px`;
      ball.style.transform = `translate(${(cx - ballSize / 2).toFixed(1)}px, ${(cy - ballSize / 2).toFixed(1)}px)`;
      // the clay forms as the statue dissolves, then settles to a quiet ambient
      const formed = Math.min(1, segF); // 0 in hero → 1 by the first stop
      ball.style.opacity = (formed < 1 ? formed * 0.9 : 0.6).toFixed(3);

      // statue: crisp in the hero, then dissolves + sinks as the clay forms
      const statue = statueRef.current;
      if (statue) {
        statue.style.opacity = (1 - heroP).toFixed(3);
        statue.style.transform = `translateY(${(heroP * -24).toFixed(1)}px) scale(${(1 - heroP * 0.12).toFixed(3)})`;
        statue.style.filter = `drop-shadow(0 30px 60px rgba(0,0,0,0.55)) blur(${(heroP * 3).toFixed(1)}px)`;
      }
      const disc = discRef.current;
      if (disc) disc.style.opacity = String(Math.max(0, 1 - heroP * 1.15));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [hasStatue]);

  return (
    <div className="clayscroll" aria-hidden="true">
      <div className="clayscroll-disc" ref={discRef} />
      <img
        className="clayscroll-statue"
        ref={statueRef}
        src={`${BASE}statue.png`}
        alt=""
        style={{ opacity: hasStatue ? 1 : 0 }}
        onLoad={() => setHasStatue(true)}
        onError={() => setHasStatue(false)}
      />
      <div className="clayscroll-ball" ref={ballRef} />
    </div>
  );
}
