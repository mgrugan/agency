import { useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

/**
 * Full-bleed scroll-scrubbed hero. The crumble clip fills the whole hero
 * (its dark ground blends into the page — no box), and its playhead is
 * tied to scroll: the statue stands at the top and melts into a ball of
 * clay as you scroll through the pinned section, then releases into the
 * page. Falls back to the statue poster if the clip is absent.
 */
export function HeroFilm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const durationRef = useRef(0);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const scrub = sec.offsetHeight - window.innerHeight;
      const p = scrub > 0 ? Math.min(1, Math.max(0, -rect.top / scrub)) : 0;

      const v = videoRef.current;
      if (v && durationRef.current && !reduced) {
        const t = p * durationRef.current;
        if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
      }
      const ov = overlayRef.current;
      if (ov) {
        // headline recedes as the statue melts, clearing the frame near the end
        const fade = Math.max(0, 1 - Math.max(0, p - 0.45) / 0.4);
        ov.style.opacity = fade.toFixed(3);
        ov.style.transform = `translateY(${(p * -40).toFixed(1)}px)`;
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
  }, []);

  return (
    <section className="herofilm" ref={sectionRef}>
      <div className="herofilm-sticky">
        <video
          className="herofilm-video"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={`${BASE}statue.png`}
          onLoadedMetadata={(e) => {
            durationRef.current = e.currentTarget.duration || 0;
          }}
        >
          <source src={`${BASE}crumble.mp4`} type="video/mp4" />
        </video>
        <div className="herofilm-scrim" />

        <div className="herofilm-overlay" ref={overlayRef}>
          <div className="shero-content">
            <span className="eyebrow">Our approach</span>
            <h1>AMPLIFY</h1>
            <p>
              We turn classical patience into modern momentum — engineering audiences that reach 128
              million people a month, and make brands impossible to ignore.
            </p>
            <a className="shero-cta" href="#portfolio">
              <span className="ring" aria-hidden="true">
                →
              </span>
              <span>See the network</span>
            </a>
          </div>

          <div className="shero-index">
            <span className="cur">01</span>
            <span className="bar">
              <i />
            </span>
            <span className="tot">03</span>
          </div>
        </div>
      </div>
    </section>
  );
}
