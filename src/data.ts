import { seeded } from "./lib/format";

export const MONTHS = [
  "Aug", "Sep", "Oct", "Nov", "Dec", "Jan",
  "Feb", "Mar", "Apr", "May", "Jun", "Jul",
];

/* ————— Headline KPIs ————— */
export const kpis = [
  {
    label: "Monthly impressions",
    value: 128_400_000,
    delta: 14.2,
    vs: "vs June",
    spark: [72, 76, 74, 81, 86, 84, 92, 97, 103, 112, 118, 128],
  },
  {
    label: "Monthly reach",
    value: 96_200_000,
    delta: 11.8,
    vs: "vs June",
    spark: [58, 61, 60, 66, 69, 72, 75, 79, 82, 88, 91, 96],
  },
  {
    label: "Total followers",
    value: 45_400_000,
    delta: 3.4,
    vs: "vs June",
    spark: [38.2, 38.9, 39.4, 40.1, 40.8, 41.5, 42.1, 42.8, 43.4, 44.1, 44.8, 45.4],
  },
  {
    label: "Avg engagement rate",
    value: 4.8,
    delta: 0.6,
    vs: "vs June",
    isRate: true,
    spark: [3.9, 4.0, 3.8, 4.1, 4.2, 4.1, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8],
  },
] as const;

/* ————— Growth timeline (impressions, M) ————— */
export const growthTimeline = {
  current: [72, 76, 74, 81, 86, 84, 92, 97, 103, 112, 118, 128.4],
  previous: [51, 54, 56, 55, 60, 63, 62, 66, 70, 73, 75, 78],
};

/* ————— Portfolio ————— */
export interface Account {
  handle: string;
  followers: number;
  category: string;
  growth: number; // monthly %
  reach: number; // avg monthly reach
  engagement: number; // %
  spark: number[];
}

const raw: Array<[string, number, string]> = [
  ["foodsbible", 5_700_000, "Food"],
  ["ocean.destinations", 4_900_000, "Travel"],
  ["howallstuffworks", 4_700_000, "Science"],
  ["InterestingasTech", 2_100_000, "Tech"],
  ["oh_no_cringe_mexican", 2_000_000, "Humor"],
  ["hoodmemeez", 1_900_000, "Memes"],
  ["seven_seas_explorer", 1_800_000, "Travel"],
  ["istolegoodmemes", 1_800_000, "Memes"],
  ["old_trends_again", 1_800_000, "Nostalgia"],
  ["InterestingAsFacts", 1_700_000, "Facts"],
  ["howmoviesarefilmed", 1_600_000, "Film"],
  ["projectarcheology", 1_600_000, "History"],
  ["ruthless.povs", 1_500_000, "POV"],
  ["historyclipsonly", 1_400_000, "History"],
  ["whenactorsfail", 1_200_000, "Film"],
  ["teacherpranks", 1_200_000, "Humor"],
  ["males_hub_", 1_200_000, "Lifestyle"],
  ["crazyhoodkids", 1_100_000, "Humor"],
  ["spacexplanation", 1_100_000, "Space"],
  ["culturalmeme.s", 1_100_000, "Culture"],
  ["postinghoodmemes", 1_000_000, "Memes"],
  ["terrifyingasfacts", 1_000_000, "Facts"],
  ["milkyhubs", 1_000_000, "Entertainment"],
  ["combatreelsonly", 1_000_000, "Combat Sports"],
];

export const accounts: Account[] = raw.map(([handle, followers, category]) => {
  const growth = 2.2 + seeded(handle, 1) * 6.3; // 2.2–8.5 %/mo
  const reach = followers * (2.4 + seeded(handle, 2) * 4.2); // 2.4–6.6× followers
  const engagement = 3.1 + seeded(handle, 3) * 4.4; // 3.1–7.5 %
  const spark = Array.from({ length: 12 }, (_, i) => {
    const wobble = (seeded(handle, 10 + i) - 0.5) * 0.06;
    return 1 + (i / 11) * (growth / 100) * 9 + wobble;
  });
  return { handle, followers, category, growth, reach, engagement, spark };
});

/* ————— Client performance ————— */
export const clients = [
  { name: "Harvest & Co.", code: "HV", accounts: 4, impressions: 21_400_000, growth: 18.2, er: 5.1, retainer: 42_000 },
  { name: "Northwind Travel", code: "NW", accounts: 3, impressions: 17_800_000, growth: 12.4, er: 4.6, retainer: 36_000 },
  { name: "Atlas Media Group", code: "AM", accounts: 5, impressions: 15_200_000, growth: 9.8, er: 4.2, retainer: 31_000 },
  { name: "Verve Entertainment", code: "VE", accounts: 3, impressions: 12_600_000, growth: 15.6, er: 5.4, retainer: 28_000 },
  { name: "Pioneer Labs", code: "PL", accounts: 2, impressions: 9_400_000, growth: 22.1, er: 4.9, retainer: 24_000 },
  { name: "Coastline Foods", code: "CF", accounts: 2, impressions: 7_200_000, growth: 7.3, er: 3.8, retainer: 18_000 },
] as const;

/* ————— Revenue (monthly, $) ————— */
export const revenue = {
  months: [148, 152, 149, 158, 164, 171, 176, 182, 189, 196, 205, 214].map((n) => n * 1000),
  mrr: 214_000,
  arr: 2_568_000,
  deltaMoM: 4.4,
};

/* ————— Campaign pipeline (ordinal) ————— */
export const pipeline = [
  { stage: "Pitched", count: 48, value: 1_920_000 },
  { stage: "Proposal", count: 29, value: 1_260_000 },
  { stage: "Negotiation", count: 17, value: 840_000 },
  { stage: "Closed won", count: 11, value: 612_000 },
] as const;

/** Validated ordinal green ramp — light → dark with stage depth. */
export const pipelineRamp = ["#22C55E", "#16A34A", "#15803D", "#166534"];

/* ————— Engagement heatmap: 7 days × 12 two-hour slots ————— */
export const heatDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const heatSlots = ["12a", "2a", "4a", "6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p"];

export const heatmap: number[][] = heatDays.map((day, d) =>
  heatSlots.map((_, h) => {
    // Evenings and weekends run hot; overnight cools off.
    const evening = Math.exp(-Math.pow(h - 9.4, 2) / 7);
    const lunch = 0.5 * Math.exp(-Math.pow(h - 6.2, 2) / 3);
    const weekend = d >= 5 ? 0.22 : 0;
    const overnight = h < 3 ? -0.28 : 0;
    const noise = (seeded(day, h) - 0.5) * 0.14;
    return Math.max(0.04, Math.min(1, 0.18 + evening + lunch + weekend + overnight + noise));
  }),
);

/* ————— Audience demographics ————— */
export const ageBands = [
  { band: "13–17", share: 9 },
  { band: "18–24", share: 34 },
  { band: "25–34", share: 31 },
  { band: "35–44", share: 16 },
  { band: "45+", share: 10 },
] as const;

export const topRegions = [
  { region: "United States", share: 41 },
  { region: "United Kingdom", share: 12 },
  { region: "Mexico", share: 9 },
  { region: "Canada", share: 7 },
  { region: "Australia", share: 5 },
] as const;

/* ————— Recent wins ————— */
export const wins = [
  { text: "foodsbible reel crossed 48M views — best performer this quarter", meta: "Viral post · 2 days ago" },
  { text: "Pioneer Labs signed a 12-month retainer at $24K/mo", meta: "New business · 3 days ago" },
  { text: "ocean.destinations passed 4.9M followers, +212K this month", meta: "Milestone · 5 days ago" },
  { text: "Network monthly impressions cleared 125M for the first time", meta: "Milestone · 1 week ago" },
  { text: "howallstuffworks carousel hit 9.2% engagement, 3× account average", meta: "Viral post · 1 week ago" },
] as const;

/* ————— Team activity ————— */
export const activity = [
  { who: "MK", name: "Maya K.", text: "scheduled 14 posts across the meme network", when: "26 min ago" },
  { who: "DR", name: "Dan R.", text: "shipped July performance decks to all six clients", when: "1 hr ago" },
  { who: "AS", name: "Aisha S.", text: "flagged a trending audio for spacexplanation", when: "2 hrs ago" },
  { who: "JT", name: "Jonah T.", text: "closed negotiation with Verve on Q3 campaign", when: "4 hrs ago" },
  { who: "LP", name: "Lena P.", text: "refreshed thumbnails on 8 underperforming reels", when: "6 hrs ago" },
] as const;

/* ————— Content calendar (this week) ————— */
export interface CalPost {
  time: string;
  title: string;
  live?: boolean;
}

export const calendar: Array<{ day: string; date: number; today?: boolean; posts: CalPost[] }> = [
  { day: "Mon", date: 6, today: true, posts: [
    { time: "10:00", title: "foodsbible · 60-sec street food cut", live: true },
    { time: "18:30", title: "hoodmemeez · caption contest" },
  ] },
  { day: "Tue", date: 7, posts: [
    { time: "09:00", title: "howallstuffworks · engine explainer" },
    { time: "19:00", title: "ruthless.povs · POV series ep. 12" },
  ] },
  { day: "Wed", date: 8, posts: [
    { time: "12:00", title: "ocean.destinations · Amalfi drone reel" },
  ] },
  { day: "Thu", date: 9, posts: [
    { time: "11:00", title: "InterestingasTech · foldable teardown" },
    { time: "20:00", title: "whenactorsfail · blooper compilation" },
  ] },
  { day: "Fri", date: 10, posts: [
    { time: "10:30", title: "projectarcheology · dig-site carousel" },
    { time: "17:00", title: "istolegoodmemes · Friday dump" },
  ] },
  { day: "Sat", date: 11, posts: [
    { time: "13:00", title: "seven_seas_explorer · reef diving cut" },
  ] },
  { day: "Sun", date: 12, posts: [
    { time: "16:00", title: "historyclipsonly · WWII colorized" },
    { time: "19:30", title: "culturalmeme.s · weekly roundup" },
  ] },
];
