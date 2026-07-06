import { seeded } from "./lib/format";

/* ————— Portfolio ————— */
export interface Account {
  handle: string;
  followers: number;
  category: string;
  growth: number; // monthly %
  reach: number; // avg monthly reach
  engagement: number; // %
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

export const accounts: Account[] = raw.map(([handle, followers, category]) => ({
  handle,
  followers,
  category,
  growth: 2.2 + seeded(handle, 1) * 6.3, // 2.2–8.5 %/mo
  reach: followers * (2.4 + seeded(handle, 2) * 4.2), // 2.4–6.6× followers
  engagement: 3.1 + seeded(handle, 3) * 4.4, // 3.1–7.5 %
}));
