import { useEffect, useRef } from "react";

/** Grid + camera constants (mirrors the reference sketch's wave field). */
const SEPARATION = 100;
const AMOUNTX = 50;
const AMOUNTY = 70;
const DOT_BASE_SIZE = 2.8;
const FOG_NEAR = 1500;
const FOG_FAR = 5500;
const CAM_Y = 450;
const CAM_Z = 1400;
const FOV = 60;

interface Dot {
  x: number;
  y: number;
  size: number;
  opacity: number;
  depth: number;
}

/**
 * Animated 3D wave grid of dots on a 2D canvas — no libraries. The dot colour
 * comes from the --dot-rgb design token, the canvas fills its parent, and the
 * loop pauses when off-screen and honours prefers-reduced-motion.
 */
export function DottedSurface({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return; // no 2D context — render nothing rather than throw

    const rgb =
      getComputedStyle(document.documentElement).getPropertyValue("--dot-rgb").trim() ||
      "143, 240, 164";
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let count = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (x: number, y: number, z: number) => {
      const cz = z + CAM_Z;
      if (cz <= 10) return null;
      const fovFactor = height / (2 * Math.tan((FOV * Math.PI) / 180 / 2));
      return {
        x: (x / cz) * fovFactor + width / 2,
        y: (-(y - CAM_Y) / cz) * fovFactor + height / 2,
        scale: fovFactor / cz,
        depth: cz,
      };
    };

    const fog = (depth: number) => {
      if (depth <= FOG_NEAR) return 1;
      if (depth >= FOG_FAR) return 0;
      return 1 - (depth - FOG_NEAR) / (FOG_FAR - FOG_NEAR);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const halfX = (AMOUNTX * SEPARATION) / 2;
      const halfZ = (AMOUNTY * SEPARATION) / 2;
      const dots: Dot[] = [];

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const x = ix * SEPARATION - halfX;
          const z = iy * SEPARATION - halfZ;
          const y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          const p = project(x, y, z);
          if (!p) continue;
          if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) continue;
          const f = fog(p.depth);
          if (f <= 0.01) continue;
          dots.push({ x: p.x, y: p.y, size: DOT_BASE_SIZE * p.scale * 10, opacity: 0.8 * f, depth: p.depth });
        }
      }

      dots.sort((a, b) => b.depth - a.depth);
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(dot.size, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${dot.opacity})`;
        ctx.fill();
      }
      count += 0.08;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause the loop whenever the canvas scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !raf) raf = requestAnimationFrame(loop);
        else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (reduced) draw(); // single static frame
    else raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={`dotted-surface ${className}`.trim()} aria-hidden="true" />;
}
