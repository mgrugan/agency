export function compact(n: number, digits = 1): string {
  if (n >= 1_000_000_000) return trim((n / 1_000_000_000).toFixed(digits)) + "B";
  if (n >= 1_000_000) return trim((n / 1_000_000).toFixed(digits)) + "M";
  if (n >= 1_000) return trim((n / 1_000).toFixed(digits)) + "K";
  return String(Math.round(n));
}

export function money(n: number): string {
  return "$" + compact(n);
}

export function pct(n: number, digits = 1): string {
  return trim(n.toFixed(digits)) + "%";
}

export function signed(n: number, digits = 1): string {
  return (n >= 0 ? "+" : "−") + trim(Math.abs(n).toFixed(digits));
}

function trim(s: string): string {
  return s.replace(/\.0+$/, "");
}

/** Deterministic 0..1 hash so demo figures stay stable between renders. */
export function seeded(key: string, salt = 0): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}
