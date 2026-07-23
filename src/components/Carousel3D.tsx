import { useEffect, useRef, useState } from "react";
import { accounts } from "../data";
import { ChromeCard } from "./ChromeCard";

const CARD_W = 240;
const GAP = 26;
const N = accounts.length;
const STEP = 360 / N;
const RADIUS = Math.round((CARD_W / 2 + GAP) / Math.tan(Math.PI / N));
const IDLE_SPEED = -0.045; // deg per frame @60fps — slow, stately drift

/** Draggable auto-rotating 3D ring of the full portfolio. On phones the 3D
 *  ring is janky, so it falls back to a flat, swipeable scroll row. */
export function Carousel3D() {
  const [mobile, setMobile] = useState(() =>
    typeof matchMedia !== "undefined" ? matchMedia("(max-width: 760px)").matches : false,
  );
  useEffect(() => {
    const mq = matchMedia("(max-width: 760px)");
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (mobile) {
    return (
      <>
        <div className="carousel-scroll" role="group" aria-label="Portfolio of managed accounts. Swipe to browse.">
          {accounts.map((a) => (
            <ChromeCard key={a.handle} acct={a} className="cc-flat" />
          ))}
        </div>
        <div className="carousel-hint">Swipe · 25 accounts · 46.8M followers</div>
      </>
    );
  }

  return <Carousel3DRing />;
}

/** Desktop-only 3D ring. */
function Carousel3DRing() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({ angle: 0, velocity: IDLE_SPEED, dragging: false, hovering: false, lastX: 0 });

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) state.current.velocity = 0;
    let raf = 0;
    const tick = () => {
      const s = state.current;
      // Freeze the ring while hovering a card so it can be tilted with the cursor.
      if (!s.dragging && !s.hovering) {
        s.angle += s.velocity;
        // decay drag momentum back to the idle drift
        if (!reduced) s.velocity += (IDLE_SPEED - s.velocity) * 0.02;
        else s.velocity *= 0.95;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(-50%, -50%) translateZ(${-RADIUS}px) rotateY(${s.angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const s = state.current;
    s.dragging = true;
    s.lastX = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.angle += dx * 0.16;
    s.velocity = dx * 0.16;
  };

  const endDrag = () => {
    state.current.dragging = false;
  };

  return (
    <>
      <div
        className="carousel-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        role="group"
        aria-label="Portfolio of managed accounts. Drag to rotate."
      >
        <div ref={ringRef} className="carousel-ring">
          {accounts.map((a, i) => (
            <div
              key={a.handle}
              onMouseEnter={() => (state.current.hovering = true)}
              onMouseLeave={() => (state.current.hovering = false)}
              style={{
                position: "absolute",
                transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <ChromeCard acct={a} />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-hint">Drag to spin · 25 accounts · 46.8M followers</div>
    </>
  );
}
