import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DottedSurface } from "./DottedSurface";

/**
 * Full-screen branded loader shown while the app (fonts, the heavy
 * model-viewer chunk, the GLB) warms up in the background. Fades out once
 * everything is ready, then calls onEnter so the hero's cipher animations
 * play as the user lands — not behind the curtain.
 */
export function LoadingScreen({ onEnter, ready }: { onEnter: () => void; ready?: boolean }) {
  const [gone, setGone] = useState(false);
  const [dots, setDots] = useState(1);
  // resolver for the "statue is loaded & framed" gate, fired when `ready` flips
  const readyResolve = useRef<(() => void) | null>(null);

  // Animate the ellipsis: . -> .. -> ...
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d % 3) + 1), 450);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (ready) readyResolve.current?.();
  }, [ready]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onEnter(); // start hero animations as the curtain lifts
      setGone(true);
      document.body.style.overflow = "";
    };

    const minDisplay = new Promise<void>((r) => setTimeout(r, 900));
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
    const windowLoaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    });
    // wait for the statue to be loaded & framed so the head-shot zoom happens
    // behind the curtain — only the clean zoom-out is ever visible
    const heroReady = new Promise<void>((r) => {
      if (ready) r();
      else readyResolve.current = r;
    });

    Promise.all([minDisplay, fontsReady, windowLoaded, heroReady]).then(finish);
    const cap = setTimeout(finish, 6000); // never trap the user
    return () => {
      clearTimeout(cap);
      document.body.style.overflow = "";
    };
  }, [onEnter]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <DottedSurface className="loader-dots" />
          <div className="loader-inner">
            <span className="loader-mark">
              Loading
              <span className="loader-ellipsis" aria-hidden="true">
                {".".repeat(dots)}
              </span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
