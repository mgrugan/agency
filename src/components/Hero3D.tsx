import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "@google/model-viewer";
import { useCipher } from "./CipherText";
import { GlitchStat } from "./GlitchStat";

const BASE = import.meta.env.BASE_URL;

interface MV extends HTMLElement {
  cameraOrbit: string;
}

/**
 * Classical hero: a centered 3D statue mesh (model-viewer) sandwiched between
 * two layers of a screen-wide AMPLIFY — a solid green fill behind and a hollow
 * outline in front so the word stays readable across the figure. Value-prop
 * copy flanks the statue on the left, the network stats on the right.
 */
export function Hero3D() {
  const secRef = useRef<HTMLElement | null>(null);
  const mvRef = useRef<MV | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const apply = useCallback(() => {
    const mv = mvRef.current;
    const stage = stageRef.current;
    const theta = 0 + mouse.current.x * 14 + scroll.current * 95; // yaw — faces forward, turns more on scroll
    const phi = 90 - mouse.current.y * 9 - scroll.current * 12; // pitch
    if (mv) mv.cameraOrbit = `${theta.toFixed(1)}deg ${phi.toFixed(1)}deg 105%`;
    if (stage) {
      stage.style.transform = `translate3d(${(mouse.current.x * 24).toFixed(1)}px, ${(scroll.current * -120 + mouse.current.y * 16).toFixed(1)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sec = secRef.current;
        if (!sec) return;
        const h = sec.offsetHeight || window.innerHeight;
        scroll.current = reduced ? 0 : Math.min(1.4, Math.max(0, window.scrollY / h));
        apply();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [apply]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = e.currentTarget.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      };
      apply();
    },
    [apply],
  );

  const amp = useCipher("AMPLIFY", { delay: 260 });

  return (
    <header className="shero" ref={secRef} onMouseMove={onMouseMove}>
      {/* back layer: eyebrow + solid AMPLIFY, sits behind the statue */}
      <span className="eyebrow shero-eyebrow" aria-hidden="true">
        Telos — the end we build toward
      </span>
      <div className="amp amp-solid" aria-hidden="true">
        {amp}
      </div>

      {/* centered statue */}
      <div className="shero-stage" ref={stageRef} aria-hidden="true">
        <div className="shero-disc" />
        <model-viewer
          ref={mvRef as React.RefObject<HTMLElement>}
          className="shero-model"
          src={`${BASE}telos-statue.glb`}
          poster={`${BASE}statue.png`}
          alt="Classical statue, the Telos Media mark"
          camera-controls
          disable-zoom
          disable-pan
          interaction-prompt="none"
          camera-orbit="0deg 90deg 105%"
          min-camera-orbit="auto auto 60%"
          max-camera-orbit="auto auto 200%"
          environment-image="neutral"
          tone-mapping="neutral"
          shadow-intensity="0.5"
          shadow-softness="1"
          exposure="1"
        />
      </div>

      {/* front layer: hollow AMPLIFY, sits over the statue so the word reads */}
      <div className="amp amp-hollow" aria-hidden="true">
        {amp}
      </div>
      <h1 className="sr-only">Amplify</h1>

      {/* left flank: value prop + CTA */}
      <div className="shero-side shero-left">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
      </div>

      {/* right flank: network stats */}
      <div className="shero-side shero-right">
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            We operate 24 media brands reaching 45 million followers, and put that distribution
            machine — and the data behind it — to work for ambitious companies.
          </p>
          <div className="hero-stats">
            <GlitchStat value="45.4M" label="Followers" run delay={0} />
            <GlitchStat value="128M+" label="Monthly reach" run delay={180} />
            <GlitchStat value="24" label="Brands" run delay={360} />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
