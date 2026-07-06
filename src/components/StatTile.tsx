import { useCountUp, useInView, useTilt } from "../lib/hooks";
import { compact, pct, signed } from "../lib/format";
import { Sparkline } from "./Sparkline";

interface Props {
  label: string;
  value: number;
  delta: number;
  vs: string;
  spark: readonly number[];
  isRate?: boolean;
}

export function StatTile({ label, value, delta, vs, spark, isRate }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const animated = useCountUp(value, inView);
  const tilt = useTilt(4);

  return (
    <div ref={ref} className="card tile tilt" {...tilt}>
      <div className="label-caps">{label}</div>
      <div className="tile-value-row">
        <span className="tile-value">{isRate ? pct(animated) : compact(animated)}</span>
        <span className={`tile-delta ${delta >= 0 ? "up" : "down"}`}>
          {delta >= 0 ? "▲" : "▼"} {signed(delta)}
          {isRate ? " pt" : "%"}
        </span>
      </div>
      <div className="tile-spark">
        <Sparkline values={[...spark]} run={inView} />
      </div>
      <div className="tile-vs">{vs} · trailing 12 mo</div>
    </div>
  );
}
