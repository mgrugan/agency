import { ReactNode } from "react";
import { useInView } from "../lib/hooks";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Fade + 12px rise once scrolled into view; also flips `.in` for child chart animations. */
export function Reveal({ children, delay = 0, className = "" }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
