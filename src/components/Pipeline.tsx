import { pipeline, pipelineRamp } from "../data";
import { useInView } from "../lib/hooks";
import { money } from "../lib/format";

export function Pipeline() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = pipeline[0].count;

  return (
    <div ref={ref} className={`card ${inView ? "in" : ""}`}>
      <div className="card-head">
        <div>
          <div className="card-title">Campaign pipeline</div>
          <div className="card-note">{money(pipeline[0].value)} in play this quarter</div>
        </div>
      </div>
      <div className="pipeline" style={{ marginTop: 14 }}>
        {pipeline.map((p, i) => (
          <div className="pipe-row" key={p.stage}>
            <span className="pipe-name">{p.stage}</span>
            <div className="pipe-track">
              <div
                className="pipe-fill"
                style={{
                  width: `${(p.count / max) * 100}%`,
                  background: pipelineRamp[i],
                  transitionDelay: `${i * 110}ms`,
                }}
              />
            </div>
            <span className="pipe-value">{p.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
