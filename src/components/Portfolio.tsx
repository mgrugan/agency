import { Account, accounts } from "../data";
import { useInView, useTilt } from "../lib/hooks";
import { compact, pct } from "../lib/format";
import { Reveal } from "./Reveal";
import { Sparkline } from "./Sparkline";

function initials(handle: string): string {
  const clean = handle.replace(/[._]+/g, " ").trim();
  const parts = clean.split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : clean.slice(0, 2)).toUpperCase();
}

function AccountCard({ acct }: { acct: Account }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tilt = useTilt(6);

  return (
    <div ref={ref} className="card acct tilt" {...tilt}>
      <div className="acct-top">
        <div className="avatar" aria-hidden="true">
          {initials(acct.handle)}
        </div>
        <div className="acct-id">
          <div className="acct-handle">@{acct.handle}</div>
          <div className="acct-cat">{acct.category}</div>
        </div>
      </div>

      <div className="acct-followers">
        <span className="n">{compact(acct.followers)}</span>
        <span className="u">followers</span>
        <span className="acct-growth">▲ {pct(acct.growth)}/mo</span>
      </div>

      <div className="acct-more">
        <div className="acct-stat">
          <div className="label-caps">Avg reach</div>
          <div className="acct-stat-v">{compact(acct.reach)}</div>
        </div>
        <div className="acct-stat">
          <div className="label-caps">Engagement</div>
          <div className="acct-stat-v">{pct(acct.engagement)}</div>
        </div>
      </div>

      <div className="acct-spark" aria-hidden="true">
        <div className="label-caps" style={{ fontSize: "0.5625rem", marginBottom: 2 }}>
          12-mo follower trend
        </div>
        <Sparkline values={acct.spark} run={inView} width={210} height={26} />
      </div>
    </div>
  );
}

export function Portfolio() {
  const total = accounts.reduce((s, a) => s + a.followers, 0);

  return (
    <section className="section">
      <Reveal>
        <div className="section-head">
          <div>
            <h2 className="section-title">Portfolio</h2>
            <p className="section-sub">
              {accounts.length} managed accounts · {compact(total)} combined followers
            </p>
          </div>
          <span className="label-caps">Sorted by audience</span>
        </div>
      </Reveal>
      <div className="portfolio-grid">
        {accounts.map((a, i) => (
          <Reveal key={a.handle} delay={(i % 4) * 60}>
            <AccountCard acct={a} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
