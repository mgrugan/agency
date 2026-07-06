import { useCallback, useEffect, useRef } from "react";
import { accounts } from "../data";
import { useCountUp, useInView } from "../lib/hooks";
import { ChromeCard } from "./ChromeCard";
import { NetworkBg } from "./NetworkBg";

function Stat({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const n = useCountUp(value, run, 1200);
  return (
    <div className="hstat">
      <div className="v">
        {value % 1 === 0 ? Math.round(n) : n.toFixed(1)}
        {suffix}
      </div>
      <div className="k">{label}</div>
    </div>
  );
}

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const indexRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
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

  // Fade the "01" slide index as the hero scrolls away.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = indexRef.current;
        if (!el) return;
        const p = Math.min(1, Math.max(0, window.scrollY / 420));
        el.style.opacity = String(1 - p);
        el.style.transform = `translateY(${p * 40}px)`;
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
    <header className="hero">
      <div
        className="hero-panel"
        ref={panelRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <NetworkBg />
        <div className="hero-cluster" aria-hidden="true">
          {featured.map((a, i) => (
            <ChromeCard key={a.handle} acct={a} className={`c${i + 1}`} />
          ))}
        </div>

        <div className="hero-caption">
          <span className="eyebrow light">A smarter way to grow</span>
          <h2>Get noticed.</h2>
        </div>

        <div className="hero-index" ref={indexRef}>
          <span className="big">01</span>
          <div className="meta">
            <span className="eyebrow light">The network</span>
            <div className="dots">
              <i className="on" />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-copy">
        <div ref={ref}>
          <span className="eyebrow">Algo Media — social growth partner</span>
          <h1>
            Audiences,
            <br />
            <em>engineered.</em>
          </h1>
          <p className="hero-sub">
            We operate 24 media brands reaching 45 million followers — and put that distribution
            machine, and the data behind it, to work for ambitious companies.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-solid" href="#contact">
              Book a strategy call
            </a>
            <a className="btn btn-line" href="#portfolio">
              Explore the network
            </a>
          </div>

          <div className="hero-stats">
            <Stat value={45.4} suffix="M" label="Followers" run={inView} />
            <Stat value={128} suffix="M+" label="Monthly reach" run={inView} />
            <Stat value={24} suffix="" label="Brands" run={inView} />
          </div>
        </div>
      </div>
    </header>
  );
}
