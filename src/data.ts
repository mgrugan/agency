import { seeded } from "./lib/format";

/* ————— Portfolio ————— */
export interface Account {
  handle: string;
  followers: number;
  category: string;
  managed: boolean; // true = currently under active management (not just access)
  growth: number; // monthly %
  reach: number; // avg monthly reach
  engagement: number; // %
}

// [handle, followers, category, managed, reachOverride?]. `managed` accounts are
// under active, hands-on management right now; the rest are part of the wider
// network we run or have access to. Managed pages carry an explicit monthly
// reach (far higher than a follower multiple would imply).
const raw: Array<[string, number, string, boolean, number?]> = [
  // ————— under active management —————
  ["howallstuffworks", 4_600_000, "Science", true, 58_000_000],
  ["InterestingasTech", 2_000_000, "Tech", true, 41_000_000],
  ["conspiracyhistory", 1_700_000, "History", true, 33_000_000],
  ["historyclipsonly", 1_700_000, "History", true, 36_000_000],
  ["istolegoodmemes", 1_700_000, "Memes", true, 31_000_000],
  ["unseenfactsonly", 1_700_000, "Facts", true, 38_000_000],
  ["InterestingAsFacts", 1_500_000, "Facts", true, 112_000_000],
  ["terrifyingasfacts", 1_000_000, "Facts", true, 30_000_000],
  // ————— wider network (managed or access) —————
  ["foodsbible", 5_700_000, "Food", false],
  ["ocean.destinations", 4_900_000, "Travel", false],
  ["oh_no_cringe_mexican", 2_000_000, "Humor", false],
  ["hoodmemeez", 1_900_000, "Memes", false],
  ["old_trends_again", 1_800_000, "Nostalgia", false],
  ["howmoviesarefilmed", 1_600_000, "Film", false],
  ["projectarcheology", 1_600_000, "History", false],
  ["ruthless.povs", 1_500_000, "POV", false],
  ["whenactorsfail", 1_200_000, "Film", false],
  ["teacherpranks", 1_200_000, "Humor", false],
  ["males_hub_", 1_200_000, "Lifestyle", false],
  ["crazyhoodkids", 1_100_000, "Humor", false],
  ["spacexplanation", 1_100_000, "Space", false],
  ["culturalmeme.s", 1_100_000, "Culture", false],
  ["postinghoodmemes", 1_000_000, "Memes", false],
  ["milkyhubs", 1_000_000, "Entertainment", false],
  ["combatreelsonly", 1_000_000, "Combat Sports", false],
];

export const accounts: Account[] = raw.map(([handle, followers, category, managed, reachOverride]) => ({
  handle,
  followers,
  category,
  managed,
  growth: 2.2 + seeded(handle, 1) * 6.3, // 2.2 to 8.5 %/mo
  reach: reachOverride ?? followers * (2.4 + seeded(handle, 2) * 4.2), // 2.4 to 6.6x followers
  engagement: 3.1 + seeded(handle, 3) * 4.4, // 3.1 to 7.5 %
}));

/** Only the accounts under active, hands-on management right now. */
export const managedAccounts: Account[] = accounts.filter((a) => a.managed);

/** Totals for headline copy, derived so they stay in sync with the list. */
export const networkCount = accounts.length;
export const networkFollowers = accounts.reduce((s, a) => s + a.followers, 0);
