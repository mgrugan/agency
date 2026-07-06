import { useParallax } from "../lib/hooks";
import { NetworkBg } from "./NetworkBg";

export function Hero() {
  const heroRef = useParallax<HTMLElement>(1);

  return (
    <header className="hero" ref={heroRef}>
      <div className="hero-panel">
        <div className="glowmesh" />
        <NetworkBg />

        <div className="hero-caption">
          <span className="eyebrow">A smarter way to grow</span>
          <h2>Get amplified.</h2>
          <div className="ctas">
            <a className="btn btn-glass" href="#contact">
              Book a strategy call
            </a>
            <a className="btn btn-glass" href="#portfolio">
              The network ↓
            </a>
          </div>
        </div>

        <div className="hero-foot">
          <span className="idx">
            <b>01</b> — THE NETWORK
          </span>
          <span className="scroll">Scroll</span>
        </div>
      </div>

      {/* the giant word straddling the split — the mesh shows through the letters */}
      <div className="hero-word" aria-hidden="true">
        amplified.
      </div>
      <span style={{ position: "absolute", left: -9999, top: 0 }}>
        Amplified — social audiences engineered by Algo Media.
      </span>

      <span className="hero-tag">Algo Media · Est. 2026</span>
    </header>
  );
}
