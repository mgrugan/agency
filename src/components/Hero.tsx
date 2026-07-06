import { useCallback } from "react";
import { accounts } from "../data";
import { useCountUp, useInView } from "../lib/hooks";
import { ChromeCard } from "./ChromeCard";
import { Reveal } from "./Reveal";

function HeroStat({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const n = useCountUp(value, run, 1100);
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

  return (
    <header className="hero" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="wrap">
        <div className="hero-grid">
          <Reveal>
            <div>
              <div className="label-caps hero-eyebrow">
                Social growth partner · 128M+ monthly impressions
              </div>
              <h1>
                We build audiences that <em>move markets.</em>
              </h1>
              <p className="hero-sub">
                Algo Media operates 24 media brands reaching 45 million followers. We put that
                distribution machine behind ambitious companies — and turn attention into revenue.
              </p>
              <div className="hero-ctas">
                <a className="btn btn-green" href="#contact">
                  Book a strategy call
                </a>
                <a className="btn btn-ghost-dark" href="#portfolio">
                  Explore the network
                </a>
              </div>
            </div>
          </Reveal>

          <div className="hero-stage" aria-hidden="true">
            <div className="hero-cluster">
              {featured.map((a, i) => (
                <ChromeCard key={a.handle} acct={a} className={`c${i + 1}`} />
              ))}
            </div>
          </div>
        </div>

        <div ref={ref} className="hero-stats">
          <HeroStat value={45.4} suffix="M" label="Combined followers" run={inView} />
          <HeroStat value={128} suffix="M+" label="Monthly impressions" run={inView} />
          <HeroStat value={4.8} suffix="%" label="Average engagement" run={inView} />
          <HeroStat value={24} suffix="" label="Owned media brands" run={inView} />
        </div>
      </div>
    </header>
  );
}
