import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GlitchStat } from "./GlitchStat";
import { LiquidMetalButton } from "./LiquidMetalButton";

const BASE = import.meta.env.BASE_URL;

interface MV extends HTMLElement {
  cameraOrbit: string;
  cameraTarget: string;
  getDimensions?: () => { x: number; y: number; z: number };
  getBoundingBoxCenter?: () => { x: number; y: number; z: number };
}

/**
 * Classical hero: a centered 3D statue mesh (model-viewer) sandwiched between
 * two layers of a screen-wide AMPLIFY — a solid green fill behind and a hollow
 * outline in front so the word stays readable across the figure. The heavy
 * model-viewer runtime is code-split and loaded after mount so it never blocks
 * first paint. Cipher animations wait for `entered` so they play on arrival.
 */
export function Hero3D({ entered, onReady }: { entered: boolean; onReady?: () => void }) {
  const secRef = useRef<HTMLElement | null>(null);
  const mvRef = useRef<MV | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  // Load the ~1MB model-viewer custom element lazily, off the critical path.
  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").catch(() => {});
    return () => {
      cancelled = true;
      void cancelled;
    };
  }, []);

  const apply = useCallback(() => {
    const mv = mvRef.current;
    const stage = stageRef.current;
    const theta = 0 + mouse.current.x * 14 + scroll.current * 95; // yaw, faces forward, turns more on scroll
    const phi = 90 - mouse.current.y * 9 - scroll.current * 12; // pitch
    if (mv) mv.cameraOrbit = `${theta.toFixed(1)}deg ${phi.toFixed(1)}deg 135%`;
    if (stage) {
      stage.style.transform = `translate3d(${(mouse.current.x * 24).toFixed(1)}px, ${(scroll.current * -120 + mouse.current.y * 16).toFixed(1)}px, 0)`;
    }
  }, []);

  // Signal the loader once the model is ready so the curtain waits for it
  // (avoids a poster-to-model pop). The statue sits at its resting framing;
  // no intro zoom.
  useEffect(() => {
    const mv = mvRef.current;
    if (!mv) return;
    const onLoad = () => {
      onReady?.();
      apply();
    };
    mv.addEventListener("load", onLoad);
    return () => mv.removeEventListener("load", onLoad);
  }, [onReady, apply]);

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

  return (
    <header className="shero" ref={secRef} onMouseMove={onMouseMove}>
      {/* subtle brand-tinted aurora wash */}
      <div className="aurora" aria-hidden="true" />

      {/* centered purpose statement, behind the statue */}
      <motion.div
        className="shero-center"
        initial={{ opacity: 0, y: 14 }}
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>Our purpose: full-stack marketing that moves culture and reaches millions.</p>
      </motion.div>

      {/* AMPLIFY — rises up from below, sits behind the statue */}
      <div className="amp-wrap" aria-hidden="true">
        <motion.div
          className="amp amp-solid"
          initial={{ opacity: 0, y: 140 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 140 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          AMPLIFY
        </motion.div>
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
          interaction-prompt="none"
          camera-orbit="0deg 90deg 135%"
          min-camera-orbit="auto auto 60%"
          max-camera-orbit="auto auto 240%"
          environment-image="neutral"
          tone-mapping="neutral"
          shadow-intensity="0.5"
          shadow-softness="1"
          exposure="0.3"
        />
      </div>

      <h1 className="sr-only">Amplify</h1>

      {/* stats + CTA, lower-right under AMPLIFY */}
      <motion.div
        className="shero-right"
        initial={{ opacity: 0, y: 16 }}
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-stats">
          <GlitchStat value="46.8M" label="Followers" run={entered} delay={0} />
          <GlitchStat value="500M+" label="Monthly reach" run={entered} delay={180} />
          <GlitchStat value="25" label="Brands" run={entered} delay={360} />
        </div>
        <LiquidMetalButton
          label="See the network"
          className="shero-cta"
          onClick={() =>
            document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </motion.div>
    </header>
  );
}
