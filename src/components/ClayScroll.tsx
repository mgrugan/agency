import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

/** Waypoints the ball bounces between, in viewport fractions. Alternating
 *  sides keep it out of the centre reading column. Index 0 is the hero. */
const WAY = [
  { x: 0.73, y: 0.5 }, // hero — statue over the disc
  { x: 0.87, y: 0.26 },
  { x: 0.13, y: 0.62 },
  { x: 0.88, y: 0.36 },
  { x: 0.12, y: 0.3 },
  { x: 0.82, y: 0.64 },
  { x: 0.15, y: 0.42 },
  { x: 0.85, y: 0.5 },
];

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * The main sculpture IS the scroll indicator. In the hero it shows the
 * statue; as you scroll it crumbles (video scrubbed by scroll) into a ball
 * of clay, which then bounces from section to section behind all content,
 * its position tracking how far down the page you are. Fixed at z-0 so it
 * always sits behind headlines, cards, and copy. Falls back to a sculpted
 * clay orb when the crumble clip isn't present.
 */
export function ClayScroll() {
  const ballRef = useRef<HTMLDivElement | null>(null);
  const discRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const ball = ballRef.current;
      if (!ball) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const heroH = vh;
      const max = document.documentElement.scrollHeight - vh;
      const y = window.scrollY;
      const gp = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      const heroP = Math.min(1, Math.max(0, y / (heroH * 0.9)));

      // position along the waypoint path
      const segF = gp * (WAY.length - 1);
      const i = Math.min(WAY.length - 2, Math.floor(segF));
      const f = reduced ? segF - i : easeInOut(segF - i);
      const a = WAY[i];
      const b = WAY[i + 1];
      const cx = (a.x + (b.x - a.x) * f) * vw;
      // a playful hop between each stop
      const hop = reduced ? 0 : Math.abs(Math.sin(segF * Math.PI)) * Math.min(60, vh * 0.06);
      const cy = (a.y + (b.y - a.y) * f) * vh - hop;

      // size: large statue in the hero, shrinking to a ball after it
      const bigSize = Math.min(vw * 0.46, 600);
      const ballSize = Math.max(140, Math.min(vw * 0.15, 210));
      const shrink = Math.min(1, segF); // 0..1 across the first segment
      const size = bigSize + (ballSize - bigSize) * shrink;

      ball.style.width = `${size.toFixed(0)}px`;
      ball.style.height = `${size.toFixed(0)}px`;
      ball.style.transform = `translate(${(cx - size / 2).toFixed(1)}px, ${(cy - size / 2).toFixed(1)}px)`;
      // round off into a ball as it shrinks; softer edge once travelling
      ball.style.borderRadius = `${34 + shrink * 16}%`;
      // vivid in the hero, then recede to a quiet ambient so copy stays legible
      ball.style.opacity = (1 - shrink * 0.46).toFixed(3);

      const disc = discRef.current;
      if (disc) disc.style.opacity = String(Math.max(0, 1 - heroP * 1.2));

      const v = videoRef.current;
      if (v && durationRef.current) {
        const t = heroP * durationRef.current;
        if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [hasVideo]);

  return (
    <div className="clayscroll" aria-hidden="true">
      <div className="clayscroll-disc" ref={discRef} />
      <div className="clayscroll-ball" ref={ballRef}>
        <video
          ref={videoRef}
          className="clayscroll-video"
          muted
          playsInline
          preload="auto"
          style={{ opacity: hasVideo ? 1 : 0 }}
          onLoadedMetadata={(e) => {
            durationRef.current = e.currentTarget.duration || 0;
            setHasVideo(true);
          }}
          onError={() => setHasVideo(false)}
        >
          <source src={`${BASE}crumble.mp4`} type="video/mp4" />
        </video>
        <div className="clayscroll-orb" style={{ opacity: hasVideo ? 0 : 1 }} />
      </div>
    </div>
  );
}
