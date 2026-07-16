/**
 * Calendly popup helper. Loads Calendly's widget assets once, on first use, so
 * they never touch the critical path, then opens the scheduler in an overlay
 * tinted to match the site's current theme.
 */

// Your scheduling link. Change this in one place to repoint every book-a-call.
export const CALENDLY_URL = "https://calendly.com/mgrugan-andrew/30min";

interface CalendlyGlobal {
  initPopupWidget: (opts: { url: string }) => void;
}

let loaded: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (loaded) return loaded;
  loaded = new Promise<void>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.body.appendChild(script);
  });
  return loaded;
}

/** Append theme colors so the popup matches the active light/dark theme. */
function themedUrl(base: string): string {
  const dark = document.documentElement.getAttribute("data-theme") !== "light";
  const params = dark
    ? { background_color: "0a130d", text_color: "e9fff2", primary_color: "22c55e" }
    : { background_color: "f6f5ef", text_color: "17210f", primary_color: "1f9d55" };
  const url = new URL(base);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return url.toString();
}

/** Open the Calendly scheduler in a themed popup overlay. */
export async function openCalendly(base: string = CALENDLY_URL): Promise<void> {
  try {
    await loadCalendly();
    (window as unknown as { Calendly?: CalendlyGlobal }).Calendly?.initPopupWidget({
      url: themedUrl(base),
    });
  } catch {
    // If the widget can't load (offline/blocked), fall back to opening the page.
    window.open(base, "_blank", "noopener");
  }
}
