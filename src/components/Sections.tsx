import { useEffect, useState } from "react";
import { accounts } from "../data";
import { compact } from "../lib/format";
import { Reveal } from "./Reveal";
import { ThemeToggle } from "./ThemeToggle";
import { LiquidMetalButton } from "./LiquidMetalButton";
import { openCalendly } from "../lib/calendly";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a className="wordmark" href="#top">
          Telos<span style={{ color: "var(--emerald)" }}>Media</span> <i>128M / MO</i>
        </a>
        <div className="nav-links">
          <a href="#portfolio">Network</a>
          <a href="#services">Services</a>
          <a href="#results">Results</a>
          <a href="#process">Process</a>
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <LiquidMetalButton label="Book a call" onClick={() => openCalendly()} />
        </div>
      </div>
    </nav>
  );
}

/** Techy scrolling ticker of the live account network. */
export function Marquee() {
  const items = accounts.map((a) => (
    <span className="marquee-item" key={a.handle}>
      <b>@{a.handle}</b>
      <span className="tag">{compact(a.followers)}</span>
    </span>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items}
        {items}
      </div>
    </div>
  );
}

const NodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="5" cy="6" r="2.2" />
    <circle cx="19" cy="8" r="2.2" />
    <circle cx="12" cy="18" r="2.2" />
    <path d="M6.8 7.2 10.4 16M17.6 9.4 13.6 16.6M7 6.4l10 1.4" />
  </svg>
);
const BoltIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);
const ShareIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="18" cy="5" r="2.4" />
    <circle cx="18" cy="19" r="2.4" />
    <path d="M8.1 11 15.9 6.2M8.1 13l7.8 4.6" />
  </svg>
);

const services = [
  {
    num: "01",
    icon: <NodeIcon />,
    title: "Brand & identity",
    body: "Logo, positioning, and a full visual identity — the system that makes a new company look like it has been winning for years.",
    points: ["Logo & brand identity", "Design systems & guidelines", "Messaging & positioning"],
  },
  {
    num: "02",
    icon: <BoltIcon />,
    title: "Websites & apps",
    body: "Designers and developers who ship the site or app your product deserves — fast, beautiful, and built to convert.",
    points: ["Web design & development", "Product & app interfaces", "Landing pages that convert"],
  },
  {
    num: "03",
    icon: <ShareIcon />,
    title: "Content & virality",
    body: "Editing, short-form, and campaigns engineered to travel — the same instincts that put our work in front of 100 million people a month.",
    points: ["Short-form editing & production", "Organic growth & virality", "Always-on content engine"],
  },
];

export function Services() {
  return (
    <section className="section" id="services">
      <Reveal>
        <div className="sec-head">
          <div>
            <div className="label-caps">What we do</div>
            <h2 style={{ marginTop: 14 }}>
              Growth isn't a guess. It's a <em>system</em> we already run.
            </h2>
          </div>
          <p>
            Full-stack marketing for startups and growing businesses — brand, website, and content
            from one team that has spent a decade getting people to care.
          </p>
        </div>
      </Reveal>
      <div className="wrap">
        <div className="svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="svc glass">
                <div className="ico">{s.icon}</div>
                <h3>
                  <span className="svc-num">{["I", "II", "III"][i]}</span>
                  {s.title}
                </h3>
                <p>{s.body}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const results = [
  {
    v: "48M",
    t: "views on a single video",
    p: "One edit out-delivered a national TV spot — produced in an afternoon.",
  },
  {
    v: "+212K",
    t: "followers in 30 days",
    p: "A brand's record growth month, driven by a repeatable hook framework.",
  },
  {
    v: "9.2%",
    t: "peak engagement rate",
    p: "3× the account average, engineered from real comment and retention data.",
  },
];

export function Results() {
  return (
    <section className="section on-forest" id="results">
      <Reveal>
        <div className="sec-head">
          <div>
            <div className="label-caps">Proof</div>
            <h2 style={{ marginTop: 14 }}>Numbers that convince the room.</h2>
          </div>
          <p>No vanity dashboards. Just outcomes our clients repeat in their board decks.</p>
        </div>
      </Reveal>
      <div className="wrap">
        <div className="res-grid">
          {results.map((r, i) => (
            <Reveal key={r.v} delay={i * 90}>
              <div className="res glass">
                <div className="v">{r.v}</div>
                <h3>{r.t}</h3>
                <p>{r.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { num: "01", title: "Discover", body: "We learn your product, market, and goals — then pressure-test the positioning against what actually spreads." },
  { num: "02", title: "Design", body: "Brand, identity, and the site or app — the full look and feel, built to convert from day one." },
  { num: "03", title: "Produce", body: "Our team ships content on a steady cadence: short-form, campaigns, and everything in between." },
  { num: "04", title: "Amplify", body: "We put it in front of the right people and scale what works across our 100M-reach network." },
];

export function Process() {
  return (
    <section className="section" id="process">
      <Reveal>
        <div className="sec-head">
          <div>
            <div className="label-caps">How it works</div>
            <h2 style={{ marginTop: 14 }}>Four steps. Ninety days. Compounding reach.</h2>
          </div>
        </div>
      </Reveal>
      <div className="wrap">
        <div className="proc-grid">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 110}>
              <div className="proc glass">
                <div className="num">{["I", "II", "III", "IV"][i]}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="section" id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="cta-band glass">
            <div>
              <h2>
                Building something worth <em>paying attention</em> to?
              </h2>
              <p>
                If you're launching a startup or growing a business and want a team that can build
                great products and get people to care, grab a time that works for you.
              </p>
            </div>
            <button type="button" className="btn btn-glass" onClick={() => openCalendly()}>
              Book a call →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="meander" style={{ marginBottom: 32 }} aria-hidden="true" />
        <div className="footer-inner">
          <span className="fm">
            Telos<span style={{ color: "var(--emerald)" }}>Media</span>
          </span>
          <span>Social growth, engineered · 24 brands · 45.4M followers</span>
          <span className="mono">© 2026 Telos Media</span>
        </div>
      </div>
    </footer>
  );
}
