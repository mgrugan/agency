import { useEffect, useRef, useState } from "react";
import "@google/model-viewer";
import { Reveal } from "./Reveal";

const BASE = import.meta.env.BASE_URL;

interface ModelViewerEl extends HTMLElement {
  cameraOrbit: string;
  loaded?: boolean;
  model?: {
    materials: Array<{
      pbrMetallicRoughness: {
        setMetallicFactor(v: number): void;
        setRoughnessFactor(v: number): void;
        setBaseColorFactor(v: [number, number, number, number]): void;
      };
    }>;
  };
}

/**
 * Scroll-driven 3D brand mark. The model's orbit angle is tied to the
 * section's scroll progress, so it turns as you scroll through it;
 * camera-controls still lets visitors grab and inspect it.
 */
export function Mark3D() {
  const secRef = useRef<HTMLElement | null>(null);
  const mvRef = useRef<ModelViewerEl | null>(null);
  const dragging = useRef(false);
  // Probe for the GLB before showing the section: a hidden model-viewer
  // never lays out, so it can't be the thing that decides visibility.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${BASE}algo-mark.glb`, { method: "HEAD" })
      .then((r) => alive && setReady(r.ok))
      .catch(() => alive && setReady(false));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const mv = mvRef.current;
    if (!mv) return;
    // The generated mesh ships untextured — dress it in live chrome:
    // full metallic, near-mirror roughness, faint sage-white base so the
    // environment reflections read as polished steel.
    const chrome = () => {
      mv.model?.materials.forEach((m) => {
        m.pbrMetallicRoughness.setMetallicFactor(1);
        m.pbrMetallicRoughness.setRoughnessFactor(0.16);
        m.pbrMetallicRoughness.setBaseColorFactor([0.88, 0.93, 0.9, 1]);
      });
    };
    mv.addEventListener("load", chrome);
    if (mv.loaded) chrome();
    return () => mv.removeEventListener("load", chrome);
  }, [ready]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sec = secRef.current;
        const mv = mvRef.current;
        if (!sec || !mv || dragging.current) return;
        const r = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the section enters from below, 1 when it leaves above
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        const theta = -30 + p * 360;
        const phi = 82 - p * 18;
        mv.cameraOrbit = `${theta.toFixed(1)}deg ${phi.toFixed(1)}deg 105%`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="mark3d on-forest"
      id="mark"
      ref={secRef}
      style={ready ? undefined : { display: "none" }}
    >
      <div className="wrap mark3d-grid">
        <Reveal>
          <div className="mark3d-copy">
            <div className="label-caps">The mark</div>
            <h2>
              Growth, <em>cast in chrome.</em>
            </h2>
            <p>
              The Algo arrow — one direction, forged from the same discipline we bring to every
              account we run. Scroll and it turns. Grab it and look closer.
            </p>
          </div>
        </Reveal>
        <div
          className="mark3d-stage glass"
          onPointerDown={() => (dragging.current = true)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <model-viewer
            ref={mvRef as React.RefObject<HTMLElement>}
            src={`${BASE}algo-mark.glb`}
            alt="Chrome Algo Media arrow monogram, 3D"
            camera-controls
            disable-zoom
            disable-pan
            interaction-prompt="none"
            camera-orbit="-30deg 82deg 105%"
            shadow-intensity="0.6"
            exposure="1.1"
          />
        </div>
      </div>
    </section>
  );
}
