import {
  IconBolt,
  IconCalendar,
  IconChart,
  IconDollar,
  IconFolder,
  IconGear,
  IconGrid,
  IconUsers,
} from "./Icons";

const workspace = [
  { icon: <IconGrid />, label: "Overview", active: true },
  { icon: <IconFolder />, label: "Portfolio", badge: "24" },
  { icon: <IconChart />, label: "Analytics" },
  { icon: <IconCalendar />, label: "Content calendar" },
];

const business = [
  { icon: <IconUsers />, label: "Clients", badge: "6" },
  { icon: <IconDollar />, label: "Revenue" },
  { icon: <IconBolt />, label: "Campaigns" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="wordmark">
        <span className="wordmark-name">Algo Media</span>
        <span className="wordmark-tick">▲ LIVE</span>
      </div>

      <nav className="nav-group" aria-label="Workspace">
        <div className="nav-group-label label-caps">Workspace</div>
        {workspace.map((item) => (
          <a
            key={item.label}
            className={`nav-item ${item.active ? "active" : ""}`}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            {item.icon}
            {item.label}
            {"badge" in item && item.badge && <span className="nav-badge">{item.badge}</span>}
          </a>
        ))}

        <div className="nav-group-label label-caps" style={{ marginTop: 24 }}>
          Business
        </div>
        {business.map((item) => (
          <a key={item.label} className="nav-item" href="#" onClick={(e) => e.preventDefault()}>
            {item.icon}
            {item.label}
            {"badge" in item && item.badge && <span className="nav-badge">{item.badge}</span>}
          </a>
        ))}

        <div className="nav-group-label label-caps" style={{ marginTop: 24 }}>
          System
        </div>
        <a className="nav-item" href="#" onClick={(e) => e.preventDefault()}>
          <IconGear />
          Settings
        </a>
      </nav>

      <div className="sidebar-foot">
        <div className="label-caps">Network · July</div>
        <div className="sidebar-foot-value">128.4M</div>
        <div className="sidebar-foot-delta">▲ 14.2% impressions MoM</div>
      </div>
    </aside>
  );
}
