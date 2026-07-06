import { useCallback, useEffect, useRef } from "react";
import { accounts } from "../data";
import { useCountUp, useInView } from "../lib/hooks";
import { ChromeCard } from "./ChromeCard";

function HeroStat({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const n = useCountUp(value, run, 1200);
  return (
    <div className="hstat">
      <div className="v">
        {value % 1 === 0 ? Math.round(n) : n.toFixed(1)}
        <em>{suffix}</em>
      </div>
      <div className="k">{label}</div>
    </div>
  );
}

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const indexRef = useRef<HTMLDivElement | null>(null);
  const featured = accounts.slice(0, 3);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  }, []);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
  }, []);

  // Fade + drop the "01" slide counter as the hero scrolls away.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = indexRef.current;
        if (!el) return;
        const p = Math.min(1, Math.max(0, window.scrollY / 460));
        el.style.opacity = String(1 - p);
        el.style.transform = `translateY(${p * 60}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hero" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="dot" />
              <span className="label-caps">Algorithmic social growth · 128M reach / mo</span>
            </div>
            <h1>
              <span className="line">
                <span>We engineer</span>
              </span>
              <span className="line">
                <span>audiences that</span>
              </span>
              <span className="line">
                <span>
                  <em>move markets.</em>
                </span>
              </span>
            </h1>
            <p className="hero-sub">
              Algo Media runs 24 media brands and a 45-million-follower distribution network. We put
              that machine — and the data behind it — to work for ambitious companies.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-green" href="#contact">
                Book a strategy call →
              </a>
              <a className="btn btn-ghost" href="#portfolio">
                Explore the network
              </a>
            </div>

            <div className="hero-index" ref={indexRef}>
              <span className="big">01</span>
              <div className="meta">
                <span className="label-caps">The network</span>
                <div className="bars">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-stage" aria-hidden="true">
            <div className="hero-cluster">
              {featured.map((a, i) => (
                <ChromeCard key={a.handle} acct={a} className={`c${i + 1}`} />
              ))}
            </div>
          </div>
        </div>

        <div ref={ref} className="hero-stats glass">
          <HeroStat value={45.4} suffix="M" label="Combined followers" run={inView} />
          <HeroStat value={128} suffix="M+" label="Monthly impressions" run={inView} />
          <HeroStat value={4.8} suffix="%" label="Average engagement" run={inView} />
          <HeroStat value={24} suffix="" label="Owned media brands" run={inView} />
        </div>
      </div>
    </header>
  );
}
