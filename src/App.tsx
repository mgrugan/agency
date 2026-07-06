import { kpis } from "./data";
import { Sidebar } from "./components/Sidebar";
import { StatTile } from "./components/StatTile";
import { GrowthChart } from "./components/GrowthChart";
import { RevenueChart } from "./components/RevenueChart";
import { Pipeline } from "./components/Pipeline";
import { Heatmap } from "./components/Heatmap";
import { Portfolio } from "./components/Portfolio";
import { ClientTable } from "./components/ClientTable";
import { Demographics } from "./components/Demographics";
import { Activity, Wins } from "./components/Feeds";
import { ContentCalendar } from "./components/Calendar";
import { Reveal } from "./components/Reveal";
import { IconTrendUp } from "./components/Icons";

export default function App() {
  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <Reveal>
          <div className="topbar">
            <div>
              <h1 className="topbar-title">Growth overview</h1>
              <p className="topbar-sub">
                Monday, July 6 2026 · Network on pace for <strong>128.4M impressions</strong> this
                month
              </p>
            </div>
            <div className="topbar-actions">
              <button className="btn-primary">
                <IconTrendUp size={13} />
                Monthly report
              </button>
            </div>
          </div>
        </Reveal>

        {/* KPI row */}
        <div className="kpi-row">
          {kpis.map((k, i) => (
            <Reveal key={k.label} delay={i * 70}>
              <StatTile
                label={k.label}
                value={k.value}
                delta={k.delta}
                vs={k.vs}
                spark={k.spark}
                isRate={"isRate" in k && k.isRate === true}
              />
            </Reveal>
          ))}
        </div>

        {/* Timeline + pipeline + wins */}
        <div className="overview-grid">
          <Reveal>
            <GrowthChart />
          </Reveal>
          <div className="stack">
            <Reveal delay={80}>
              <Pipeline />
            </Reveal>
            <Reveal delay={160}>
              <Wins />
            </Reveal>
          </div>
        </div>

        {/* Portfolio showcase */}
        <Portfolio />

        {/* Performance */}
        <section className="section">
          <Reveal>
            <div className="section-head">
              <div>
                <h2 className="section-title">Performance</h2>
                <p className="section-sub">Clients, audience, and where engagement happens</p>
              </div>
            </div>
          </Reveal>
          <div className="stack">
            <Reveal>
              <ClientTable />
            </Reveal>
            <div className="overview-grid" style={{ marginTop: 0 }}>
              <div className="stack">
                <Reveal>
                  <RevenueChart />
                </Reveal>
                <Reveal delay={80}>
                  <Heatmap />
                </Reveal>
              </div>
              <Reveal delay={120}>
                <Demographics />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Operations */}
        <section className="section">
          <Reveal>
            <div className="section-head">
              <div>
                <h2 className="section-title">Operations</h2>
                <p className="section-sub">What ships this week and who's shipping it</p>
              </div>
            </div>
          </Reveal>
          <div className="overview-grid" style={{ marginTop: 0 }}>
            <Reveal>
              <ContentCalendar />
            </Reveal>
            <Reveal delay={100}>
              <Activity />
            </Reveal>
          </div>
        </section>

        <footer className="foot">
          <span>Algo Media · Growth Terminal</span>
          <span className="mono">45.4M followers · 128.4M monthly impressions</span>
        </footer>
      </main>
    </div>
  );
}
