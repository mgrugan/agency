import { useCallback } from "react";
import { Account } from "../data";
import { compact, pct } from "../lib/format";

function initials(handle: string): string {
  const clean = handle.replace(/[._]+/g, " ").trim();
  const parts = clean.split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : clean.slice(0, 2)).toUpperCase();
}

interface Props {
  acct: Account;
  className?: string;
}

/** Chrome-rimmed Instagram account card. Pointer position drives the
 *  metallic rim rotation and the glossy sheen sweep. */
export function ChromeCard({ acct, className = "" }: Props) {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
    el.style.setProperty("--rx", `${((0.5 - y) * 22).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 28).toFixed(2)}deg`);
  }, []);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div className={`chrome-card ${className}`.trim()} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="cc-body">
        <div className="cc-top">
          <div className="cc-avatar" aria-hidden="true">
            <span>{initials(acct.handle)}</span>
          </div>
          <div className="cc-id">
            <div className="cc-handle">
              @{acct.handle}
              <span className="cc-verified" aria-label="verified">
                ✓
              </span>
            </div>
            <div className="cc-cat">{acct.category}</div>
          </div>
          <span className={`cc-tag ${acct.managed ? "is-managed" : ""}`}>
            {acct.managed ? "Managed" : "Network"}
          </span>
        </div>

        <div className="cc-followers">
          <span className="n">{compact(acct.followers)}</span>
          <span className="u">followers</span>
        </div>
        <div className="cc-growth">▲ {pct(acct.growth)} / month</div>

        <div className="cc-meta">
          <div className="m">
            <div className="k">Avg reach</div>
            <div className="v">{compact(acct.reach)}</div>
          </div>
          <div className="m">
            <div className="k">Engagement</div>
            <div className="v">{pct(acct.engagement)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
