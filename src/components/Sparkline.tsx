interface Props {
  values: number[];
  run: boolean;
  width?: number;
  height?: number;
  /** de-emphasis line color; the end-marker always takes the accent */
  stroke?: string;
}

export function Sparkline({ values, run, width = 110, height = 30, stroke = "#8A9990" }: Props) {
  const pad = 3;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => [
    pad + (i / (values.length - 1)) * (width - pad * 2),
    height - pad - ((v - min) / span) * (height - pad * 2),
  ]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [ex, ey] = pts[pts.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: run ? 0 : 1,
          transition: "stroke-dashoffset 850ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <circle
        cx={ex}
        cy={ey}
        r={2.6}
        fill="#16A34A"
        stroke="var(--card, #FCFDFB)"
        strokeWidth={2}
        style={{
          opacity: run ? 1 : 0,
          transition: "opacity 300ms 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </svg>
  );
}
