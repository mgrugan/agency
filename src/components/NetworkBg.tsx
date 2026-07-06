import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number; // 0 green .. 1 teal
  pulse: number;
}

/**
 * Fixed full-viewport constellation: drifting nodes wired together when close,
 * with travelling "packets" along the strongest links and a parallax nudge on
 * pointer move. Reads as an algorithmic social graph, green + teal on near-black.
 */
export function NetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.round((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 2.2,
        hue: Math.random(),
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    const LINK = 148;
    let raf = 0;
    let t = 0;

    const mix = (hue: number) => {
      // green (34,197,94) -> teal (45,212,191)
      const r = Math.round(34 + hue * 11);
      const g = Math.round(197 + hue * 15);
      const b = Math.round(94 + hue * 97);
      return [r, g, b] as const;
    };

    const draw = () => {
      t += 1;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const px = (pointer.x - 0.5) * 26;
      const py = (pointer.y - 0.5) * 26;

      ctx.clearRect(0, 0, w, h);

      // update
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const strength = 1 - d / LINK;
          const [r, g, bl] = mix((a.hue + b.hue) / 2);
          ctx.strokeStyle = `rgba(${r},${g},${bl},${(strength * 0.16).toFixed(3)})`;
          ctx.lineWidth = strength * 1.1;
          ctx.beginPath();
          ctx.moveTo(a.x + px * strength, a.y + py * strength);
          ctx.lineTo(b.x + px * strength, b.y + py * strength);
          ctx.stroke();

          // travelling packet on strong links
          if (strength > 0.62 && !reduced) {
            const prog = (Math.sin(t * 0.02 + i * 0.7) + 1) / 2;
            const cx = a.x + (b.x - a.x) * prog + px * strength;
            const cy = a.y + (b.y - a.y) * prog + py * strength;
            ctx.fillStyle = `rgba(74,222,128,${(strength * 0.7).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(cx, cy, 1.3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const glow = reduced ? 1 : (Math.sin(t * 0.03 + n.pulse) + 1) / 2;
        const [r, g, b] = mix(n.hue);
        const rad = n.r * (0.8 + glow * 0.5);
        const gx = n.x + px;
        const gy = n.y + py;
        const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad * 5);
        grd.addColorStop(0, `rgba(${r},${g},${b},${0.5 + glow * 0.4})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(gx, gy, rad * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r + 40},${g + 30},${b + 30},${0.7 + glow * 0.3})`;
        ctx.beginPath();
        ctx.arc(gx, gy, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="netbg" aria-hidden="true">
      <div className="netbg-aurora" />
      <canvas ref={canvasRef} className="netbg-canvas" />
      <div className="grain" />
    </div>
  );
}
