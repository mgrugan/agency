import { Fragment } from "react";
import { heatDays, heatSlots, heatmap } from "../data";
import { useInView } from "../lib/hooks";

/** Sequential green: opacity steps over the surface = a monotone lightness ramp. */
const STEPS = [0.07, 0.18, 0.32, 0.5, 0.72, 0.95];

function stepFor(v: number): number {
  const i = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length));
  return STEPS[i];
}

export function Heatmap() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Engagement heatmap</div>
          <div className="card-note">When the network's audience engages, local time</div>
        </div>
      </div>
      <div className="heatmap" style={{ marginTop: 8 }}>
        <div className="hm-grid">
          {heatmap.map((row, d) => (
            <Fragment key={heatDays[d]}>
              <span className="hm-day">{heatDays[d]}</span>
              {row.map((v, h) => (
                <div
                  key={`${d}-${h}`}
                  className="hm-cell"
                  title={`${heatDays[d]} ${heatSlots[h]} — engagement index ${(v * 100).toFixed(0)}`}
                  style={{
                    background: `rgba(22, 163, 74, ${stepFor(v)})`,
                    opacity: inView ? 1 : 0,
                    transition: `opacity 400ms ${d * 40 + h * 12}ms cubic-bezier(0.22,1,0.36,1)`,
                  }}
                />
              ))}
            </Fragment>
          ))}
          <span />
          {heatSlots.map((s, i) => (
            <span className="hm-hour" key={s}>
              {i % 2 === 0 ? s : ""}
            </span>
          ))}
        </div>
        <div className="hm-scale">
          <span>Less</span>
          <span className="steps">
            {STEPS.map((a) => (
              <i key={a} style={{ background: `rgba(22, 163, 74, ${a})` }} />
            ))}
          </span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
