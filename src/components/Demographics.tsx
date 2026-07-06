import { ageBands, topRegions } from "../data";
import { useInView } from "../lib/hooks";

function Bars({
  rows,
  labelWidth,
}: {
  rows: ReadonlyArray<{ label: string; share: number }>;
  labelWidth: number;
}) {
  const max = Math.max(...rows.map((r) => r.share));
  return (
    <div className="pipeline" style={{ padding: 0, gap: 10 }}>
      {rows.map((r, i) => (
        <div
          className="pipe-row"
          key={r.label}
          style={{ gridTemplateColumns: `${labelWidth}px minmax(0,1fr) 44px` }}
        >
          <span className="pipe-name">{r.label}</span>
          <div className="pipe-track" style={{ height: 14 }}>
            <div
              className="pipe-fill"
              style={{
                width: `${(r.share / max) * 100}%`,
                background: "#16A34A",
                transitionDelay: `${i * 90}ms`,
              }}
            />
          </div>
          <span className="pipe-value">{r.share}%</span>
        </div>
      ))}
    </div>
  );
}

export function Demographics() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={`card ${inView ? "in" : ""}`}>
      <div className="card-head">
        <div>
          <div className="card-title">Audience demographics</div>
          <div className="card-note">Blended across the network</div>
        </div>
      </div>
      <div style={{ padding: "16px 20px 18px", display: "grid", gap: 22 }}>
        <div>
          <div className="label-caps" style={{ marginBottom: 10 }}>
            Age distribution
          </div>
          <Bars rows={ageBands.map((a) => ({ label: a.band, share: a.share }))} labelWidth={52} />
        </div>
        <div>
          <div className="label-caps" style={{ marginBottom: 10 }}>
            Top regions
          </div>
          <Bars
            rows={topRegions.map((r) => ({ label: r.region, share: r.share }))}
            labelWidth={110}
          />
        </div>
      </div>
    </div>
  );
}
