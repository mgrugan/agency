import { calendar } from "../data";

export function ContentCalendar() {
  const scheduled = calendar.reduce((s, d) => s + d.posts.length, 0);

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Content calendar</div>
          <div className="card-note">Week of July 6 · {scheduled} posts scheduled</div>
        </div>
        <span className="label-caps">All accounts</span>
      </div>
      <div className="cal">
        {calendar.map((d) => (
          <div className={`cal-col ${d.today ? "today" : ""}`} key={d.day}>
            <div className="cal-day">
              <span className="label-caps">{d.day}</span>
              <span className="d">{d.date}</span>
            </div>
            {d.posts.map((p) => (
              <div className={`cal-post ${p.live ? "live" : ""}`} key={p.title}>
                <span className="t">{p.time}</span>
                {p.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
