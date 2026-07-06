import { activity, wins } from "../data";
import { IconCheck } from "./Icons";

export function Wins() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Recent wins</div>
          <div className="card-note">Momentum across the network</div>
        </div>
      </div>
      <div className="feed">
        {wins.map((w) => (
          <div className="feed-item" key={w.text}>
            <span className="feed-icon">
              <IconCheck />
            </span>
            <div className="feed-body">
              {w.text}
              <div className="feed-meta">{w.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Activity() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Team activity</div>
          <div className="card-note">Today</div>
        </div>
      </div>
      <div className="feed">
        {activity.map((a) => (
          <div className="feed-item" key={a.who + a.when}>
            <span className="feed-icon neutral">{a.who}</span>
            <div className="feed-body">
              <strong>{a.name}</strong> {a.text}
              <div className="feed-meta">{a.when}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
