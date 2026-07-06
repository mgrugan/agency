import { clients } from "../data";
import { useInView } from "../lib/hooks";
import { compact, money, pct, signed } from "../lib/format";

export function ClientTable() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const maxImpr = Math.max(...clients.map((c) => c.impressions));

  return (
    <div ref={ref} className={`card ${inView ? "in" : ""}`}>
      <div className="card-head">
        <div>
          <div className="card-title">Client performance</div>
          <div className="card-note">Retainer clients, trailing 30 days</div>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Client</th>
              <th className="num">Accounts</th>
              <th className="num">Impressions</th>
              <th>Share of network</th>
              <th className="num">Growth MoM</th>
              <th className="num">Eng. rate</th>
              <th className="num">Retainer</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.code}>
                <td>
                  <span className="cell-client">
                    <span className="cell-dot">{c.code}</span>
                    {c.name}
                  </span>
                </td>
                <td className="num">{c.accounts}</td>
                <td className="num">{compact(c.impressions)}</td>
                <td>
                  <span className="mini-meter">
                    <i style={{ width: `${(c.impressions / maxImpr) * 100}%` }} />
                  </span>
                </td>
                <td className="num">
                  <span className={`delta-chip ${c.growth >= 0 ? "up" : "down"}`}>
                    {signed(c.growth)}%
                  </span>
                </td>
                <td className="num">{pct(c.er)}</td>
                <td className="num">{money(c.retainer)}/mo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
