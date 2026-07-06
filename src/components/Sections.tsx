import { accounts } from "../data";
import { compact } from "../lib/format";
import { Reveal } from "./Reveal";

export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="wordmark" href="#top">
          Algo<span style={{ color: "var(--accent)" }}>Media</span> <i>128M/MO</i>
        </a>
        <div className="nav-links">
          <a href="#portfolio">Network</a>
          <a href="#services">Services</a>
          <a href="#results">Results</a>
          <a href="#process">Process</a>
        </div>
        <a className="btn btn-green" href="#contact">
          Book a call
        </a>
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
    title: "Audience growth",
    body: "We grow accounts the way we grew our own — testing hooks daily across a 45M-follower network and doubling down on what the algorithm rewards.",
    points: ["Organic follower acquisition", "Format & hook testing at scale", "Cross-network amplification"],
  },
  {
    num: "02",
    icon: <BoltIcon />,
    title: "Viral content engine",
    body: "A production system shipping 80+ pieces of content a week, engineered from performance data across hundreds of millions of impressions.",
    points: ["Short-form editing & packaging", "Trend and audio intelligence", "Always-on publishing calendar"],
  },
  {
    num: "03",
    icon: <ShareIcon />,
    title: "Distribution & partnerships",
    body: "Launch products, campaigns, and creators through owned reach — instead of renting it from an ad auction.",
    points: ["Campaigns across 24 owned brands", "Creator & brand collaborations", "Attribution-ready reporting"],
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
            Every service is powered by live signal from our own network — we sell what we practice
            on 128 million impressions a month.
          </p>
        </div>
      </Reveal>
      <div className="wrap">
        <div className="svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="svc glass">
                <div className="ico">{s.icon}</div>
                <div className="num">{s.num}</div>
                <h3>{s.title}</h3>
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
    t: "views on a single reel",
    p: "One foodsbible edit out-delivered a national TV spot — produced in an afternoon.",
  },
  {
    v: "+212K",
    t: "followers in 30 days",
    p: "ocean.destinations' record month, driven by a repeatable hook framework.",
  },
  {
    v: "9.2%",
    t: "peak engagement rate",
    p: "howallstuffworks carousel — 3× the account average, engineered from comment data.",
  },
];

export function Results() {
  return (
    <section className="section" id="results">
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
  { num: "01", title: "Audit", body: "We tear down your current presence against live benchmarks from 24 operating brands." },
  { num: "02", title: "Strategy", body: "A 90-day growth plan: positioning, formats, cadence, and the metrics that matter." },
  { num: "03", title: "Production", body: "Our content engine ships daily. You approve; the machine publishes." },
  { num: "04", title: "Scale", body: "Winners get amplified across the network. Losers get killed fast." },
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
                <div className="num">{s.num}</div>
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
                Ready to stop <em>renting</em> attention?
              </h2>
              <p>
                Tell us where you want to be in 90 days. We'll show you the exact accounts, formats,
                and numbers that get you there.
              </p>
            </div>
            <a className="btn btn-green" href="mailto:growth@algomedia.co">
              Book a strategy call →
            </a>
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
        <div className="footer-inner">
          <span className="fm">
            Algo<span style={{ color: "var(--accent)" }}>Media</span>
          </span>
          <span>Algorithmic social growth · 24 brands · 45.4M followers</span>
          <span className="mono">© 2026 Algo Media</span>
        </div>
      </div>
    </footer>
  );
}
