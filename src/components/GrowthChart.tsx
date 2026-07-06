import { useMemo, useRef, useState } from "react";
import { growthTimeline, MONTHS } from "../data";
import { useInView } from "../lib/hooks";

const VBW = 760;
const VBH = 270;
const PAD = { l: 46, r: 20, t: 14, b: 30 };
const GREEN = "#16A34A";
const SAGE = "#8A9990";

type Range = 3 | 6 | 12;

/** Catmull-Rom → cubic bezier for a calm, natural curve. */
function smoothPath(pts: Array<[number, number]>): string {
  if (pts.length < 3) return pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function niceTicks(max: number): number[] {
  const rough = max / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const step = [1, 2, 2.5, 4, 5, 10].map((m) => m * mag).find((s) => max / s <= 4.5) ?? 10 * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= max + step * 0.999; v += step) ticks.push(Math.round(v));
  return ticks;
}

export function GrowthChart() {
  const [range, setRange] = useState<Range>(12);
  const [hover, setHover] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>();

  const view = useMemo(() => {
    const cur = growthTimeline.current.slice(12 - range);
    const prev = growthTimeline.previous.slice(12 - range);
    const months = MONTHS.slice(12 - range);
    const max = Math.max(...cur, ...prev);
    const ticks = niceTicks(max);
    const top = ticks[ticks.length - 1];
    const x = (i: number) => PAD.l + (i / (cur.length - 1)) * (VBW - PAD.l - PAD.r);
    const y = (v: number) => PAD.t + (1 - v / top) * (VBH - PAD.t - PAD.b);
    const curPts = cur.map((v, i) => [x(i), y(v)] as [number, number]);
    const prevPts = prev.map((v, i) => [x(i), y(v)] as [number, number]);
    const line = smoothPath(curPts);
    const area = `${line} L${curPts[curPts.length - 1][0]},${y(0)} L${curPts[0][0]},${y(0)} Z`;
    return { cur, prev, months, ticks, top, x, y, curPts, prevPts, line, prevLine: smoothPath(prevPts), area };
  }, [range]);

  const onMove = (e: React.MouseEvent) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const fx = ((e.clientX - rect.left) / rect.width) * VBW;
    const n = view.cur.length - 1;
    const i = Math.round(((fx - PAD.l) / (VBW - PAD.l - PAD.r)) * n);
    setHover(Math.max(0, Math.min(n, i)));
  };

  const last = view.cur[view.cur.length - 1];
  const px = (vx: number) => `${(vx / VBW) * 100}%`;

  return (
    <div ref={ref} className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Network impressions</div>
          <div className="card-note">Monthly impressions across all 24 managed accounts</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="legend">
            <span className="legend-item">
              <i className="legend-key" style={{ background: GREEN }} /> This year
            </span>
            <span className="legend-item">
              <i className="legend-key" style={{ background: SAGE }} /> Last year
            </span>
          </div>
          <div className="seg" role="group" aria-label="Date range">
            {([3, 6, 12] as Range[]).map((r) => (
              <button key={r} className={range === r ? "on" : ""} onClick={() => setRange(r)}>
                {r}M
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={frameRef}
        className="chart-frame"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <svg className="chart-svg" viewBox={`0 0 ${VBW} ${VBH}`} role="img" aria-label="Line chart of monthly network impressions, this year versus last year">
          {view.ticks.map((t) => (
            <g key={t}>
              <line className="gridline" x1={PAD.l} x2={VBW - PAD.r} y1={view.y(t)} y2={view.y(t)} />
              <text className="tick" x={PAD.l - 8} y={view.y(t) + 3} textAnchor="end">
                {t}M
              </text>
            </g>
          ))}
          {view.months.map((m, i) => (
            <text key={m + i} className="tick" x={view.x(i)} y={VBH - 8} textAnchor="middle">
              {m}
            </text>
          ))}

          {/* area wash fades in after the line draws */}
          <path
            d={view.area}
            fill={GREEN}
            opacity={inView ? 0.1 : 0}
            style={{ transition: "opacity 500ms 450ms cubic-bezier(0.22,1,0.36,1)" }}
          />

          {/* previous year — de-emphasized reference */}
          <path
            d={view.prevLine}
            fill="none"
            stroke={SAGE}
            strokeWidth={2}
            strokeLinecap="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: inView ? 0 : 1,
              transition: "stroke-dashoffset 800ms 180ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* current year */}
          <path
            d={view.line}
            fill="none"
            stroke={GREEN}
            strokeWidth={2}
            strokeLinecap="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: inView ? 0 : 1,
              transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* endpoint marker + direct label */}
          <circle
            cx={view.curPts[view.curPts.length - 1][0]}
            cy={view.curPts[view.curPts.length - 1][1]}
            r={4}
            fill={GREEN}
            stroke="#FCFDFB"
            strokeWidth={2}
            style={{ opacity: inView ? 1 : 0, transition: "opacity 300ms 800ms" }}
          />
          <text
            x={view.curPts[view.curPts.length - 1][0] - 8}
            y={view.curPts[view.curPts.length - 1][1] - 10}
            textAnchor="end"
            style={{
              font: "600 11px 'Geist Mono', monospace",
              fill: "var(--ink)",
              opacity: inView ? 1 : 0,
              transition: "opacity 300ms 850ms",
            }}
          >
            {last}M
          </text>

          {/* crosshair */}
          {hover !== null && (
            <g>
              <line
                x1={view.x(hover)}
                x2={view.x(hover)}
                y1={PAD.t}
                y2={VBH - PAD.b}
                stroke="var(--line-strong)"
                strokeWidth={1}
              />
              <circle cx={view.x(hover)} cy={view.y(view.prev[hover])} r={4} fill={SAGE} stroke="#FCFDFB" strokeWidth={2} />
              <circle cx={view.x(hover)} cy={view.y(view.cur[hover])} r={4.5} fill={GREEN} stroke="#FCFDFB" strokeWidth={2} />
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="chart-tip"
            style={{
              left: px(view.x(hover)),
              top: `${(view.y(view.cur[hover]) / VBH) * 100}%`,
            }}
          >
            <div className="label-caps">{view.months[hover]} · impressions</div>
            <div className="tip-row">
              <span className="k">
                <i className="swatch" style={{ background: GREEN }} /> This year
              </span>
              <span className="v">{view.cur[hover]}M</span>
            </div>
            <div className="tip-row">
              <span className="k">
                <i className="swatch" style={{ background: SAGE }} /> Last year
              </span>
              <span className="v">{view.prev[hover]}M</span>
            </div>
            <div className="tip-row">
              <span className="k">YoY</span>
              <span className="v up">
                +{Math.round(((view.cur[hover] - view.prev[hover]) / view.prev[hover]) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
