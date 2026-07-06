import { useCallback, useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

/**
 * Dramatic "statue" hero (green treatment of the reference): an emerald
 * disc behind a classical figure, big display word, and a slide index.
 * The statue image is fetched by the deploy; until it exists the disc
 * and a sculpted-glow fallback carry the composition.
 */
export function StatueHero() {
  const [hasStatue, setHasStatue] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setHasStatue(true);
    img.onerror = () => alive && setHasStatue(false);
    img.src = `${BASE}statue.png`;
    return () => {
      alive = false;
    };
  }, []);

  // Mouse + scroll parallax on the statue/disc.
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = stageRef.current;
        if (!el) return;
        el.style.setProperty("--sy", String(Math.min(1, window.scrollY / 700)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="shero" onMouseMove={onMouseMove}>
      <div className="shero-stage" ref={stageRef}>
        <div className="shero-disc" />
        <div className="shero-disc-sm" />
        {hasStatue ? (
          <img className="shero-statue" src={`${BASE}statue.png`} alt="" aria-hidden="true" />
        ) : (
          <div className="shero-statue-fallback" aria-hidden="true" />
        )}
      </div>

      <div className="shero-content">
        <span className="eyebrow">Our approach</span>
        <h1>AMPLIFY</h1>
        <p>
          We turn classical patience into modern momentum — engineering audiences that reach 128
          million people a month, and make brands impossible to ignore.
        </p>
        <a className="shero-cta" href="#portfolio">
          <span className="ring" aria-hidden="true">
            →
          </span>
          <span>See the network</span>
        </a>
      </div>

      <div className="shero-index">
        <span className="cur">01</span>
        <span className="bar">
          <i />
        </span>
        <span className="tot">03</span>
      </div>
    </header>
  );
}
