import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

/**
 * Fixed scroll-position indicator on the right rail. As you scroll the
 * page, a "clay" object travels down a track — and if the deploy has
 * supplied the crumble clip (public/crumble.mp4), the object is that
 * video scrubbed to your scroll progress (statue → ball of clay).
 * Without the clip it falls back to a sculpted clay orb, so the rail
 * always reads as intentional.
 */
export function ScrollClay() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const durationRef = useRef(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (track && thumb) {
        const travel = track.clientHeight - thumb.clientHeight;
        thumb.style.transform = `translateY(${(p * travel).toFixed(1)}px)`;
      }
      const v = videoRef.current;
      if (v && durationRef.current) {
        // scrub the clip to scroll progress
        const t = p * durationRef.current;
        if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
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
    <div className="clayrail" aria-hidden="true">
      <div className="clayrail-track" ref={trackRef}>
        <div className="clayrail-thumb" ref={thumbRef}>
          <video
            ref={videoRef}
            className="clayrail-video"
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
          <div className="clayrail-orb" style={{ opacity: hasVideo ? 0 : 1 }} />
        </div>
      </div>
    </div>
  );
}
