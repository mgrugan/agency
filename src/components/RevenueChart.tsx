import { useState } from "react";
import { MONTHS, revenue } from "../data";
import { useInView } from "../lib/hooks";
import { money, pct } from "../lib/format";

const VBW = 720;
const VBH = 210;
const PAD = { l: 46, r: 12, t: 12, b: 26 };
const GREEN = "#16A34A";

/** Column with a 4px rounded cap and a square baseline. */
function columnPath(x: number, y: number, w: number, h: number): string {
  const r = Math.min(4, w / 2, h);
  return [
    `M${x},${y + h}`,
    `L${x},${y + r}`,
    `Q${x},${y} ${x + r},${y}`,
    `L${x + w - r},${y}`,
    `Q${x + w},${y} ${x + w},${y + r}`,
    `L${x + w},${y + h}`,
    "Z",
  ].join(" ");
}

export function RevenueChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const top = 240_000;
  const ticks = [0, 80_000, 160_000, 240_000];
  const plotW = VBW - PAD.l - PAD.r;
  const plotH = VBH - PAD.t - PAD.b;
  const slot = plotW / revenue.months.length;
  const barW = Math.min(24, slot * 0.52);
  const y = (v: number) => PAD.t + (1 - v / top) * plotH;

  return (
    <div ref={ref} className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Revenue analytics</div>
          <div className="card-note">
            MRR <strong className="mono">{money(revenue.mrr)}</strong> · ARR{" "}
            <strong className="mono">{money(revenue.arr)}</strong> ·{" "}
            <span className="up mono">▲ {pct(revenue.deltaMoM)} MoM</span>
          </div>
        </div>
      </div>
      <div className="chart-frame" style={{ position: "relative" }}>
        <svg className="chart-svg" viewBox={`0 0 ${VBW} ${VBH}`} role="img" aria-label="Monthly retainer revenue, trailing 12 months">
          {ticks.map((t) => (
            <g key={t}>
              <line className="gridline" x1={PAD.l} x2={VBW - PAD.r} y1={y(t)} y2={y(t)} />
              <text className="tick" x={PAD.l - 8} y={y(t) + 3} textAnchor="end">
                {t === 0 ? "0" : `${t / 1000}K`}
              </text>
            </g>
          ))}
          {revenue.months.map((v, i) => {
            const bx = PAD.l + i * slot + (slot - barW) / 2;
            const by = y(v);
            const isHover = hover === i;
            return (
              <g key={i}>
                <path
                  d={columnPath(bx, by, barW, VBH - PAD.b - by)}
                  fill={isHover ? "#15803D" : GREEN}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "bottom",
                    transform: inView ? "scaleY(1)" : "scaleY(0)",
                    transition: `transform 700ms ${i * 36}ms cubic-bezier(0.22,1,0.36,1), fill 160ms`,
                  }}
                />
                {/* generous hit target */}
                <rect
                  x={PAD.l + i * slot}
                  y={PAD.t}
                  width={slot}
                  height={plotH}
                  fill="transparent"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
                <text className="tick" x={bx + barW / 2} y={VBH - 8} textAnchor="middle">
                  {MONTHS[i]}
                </text>
              </g>
            );
          })}
          {/* direct label on the latest column only */}
          <text
            x={PAD.l + 11 * slot + slot / 2}
            y={y(revenue.months[11]) - 8}
            textAnchor="middle"
            style={{
              font: "600 11px 'Geist Mono', monospace",
              fill: "var(--ink)",
              opacity: inView ? 1 : 0,
              transition: "opacity 300ms 800ms",
            }}
          >
            {money(revenue.months[11])}
          </text>
        </svg>

        {hover !== null && (
          <div
            className="chart-tip"
            style={{
              left: `${((PAD.l + hover * slot + slot / 2) / VBW) * 100}%`,
              top: `${(y(revenue.months[hover]) / VBH) * 100}%`,
            }}
          >
            <div className="label-caps">{MONTHS[hover]} · retainers</div>
            <div className="tip-row">
              <span className="k">
                <i className="swatch" style={{ background: GREEN }} /> Revenue
              </span>
              <span className="v">{money(revenue.months[hover])}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
