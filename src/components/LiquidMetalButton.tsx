import { useEffect, useRef } from "react";
import { ShaderMount, liquidMetalFragmentShader } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";

interface Props {
  label: string;
  onClick?: () => void;
  className?: string;
}

/**
 * A pill button whose face is a live liquid-metal shader (paper-design), tinted
 * toward the site's emerald so the metal reads green rather than chrome. The
 * WebGL surface is mounted on an absolutely-positioned filler that matches the
 * button; the label + spark sit above it. If WebGL fails to init, the CSS
 * gradient on `.lm-shader` keeps the button on-brand.
 */
export function LiquidMetalButton({ label, onClick, className }: Props) {
  const shaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = shaderRef.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mount: ShaderMount | null = null;
    try {
      mount = new ShaderMount(
        el,
        liquidMetalFragmentShader,
        {
          // green-tinted metal — dark forest base, emerald sheen
          u_colorBack: [0.012, 0.05, 0.03, 1],
          u_colorTint: [0.14, 0.78, 0.42, 1],
          u_softness: 0.5,
          u_repetition: 4,
          u_shiftRed: 0.3,
          u_shiftBlue: 0.3,
          u_distortion: 0,
          u_contour: 0,
          u_angle: 45,
          u_shape: 0, // fill the whole pill rather than a coin
          u_isImage: false,
          // sizing
          u_scale: 8,
          u_offsetX: 0.1,
          u_offsetY: -0.1,
        },
        undefined,
        0.6, // speed
      );
    } catch {
      // WebGL unavailable — CSS fallback on .lm-shader remains visible.
    }
    return () => mount?.dispose();
  }, []);

  return (
    <button type="button" onClick={onClick} className={`lm-btn ${className ?? ""}`}>
      <span className="lm-shader" ref={shaderRef} aria-hidden="true" />
      <span className="lm-label">
        <Sparkles size={15} strokeWidth={1.9} aria-hidden="true" />
        {label}
      </span>
    </button>
  );
}
