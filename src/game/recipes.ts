import { RECIPES_PER_BOARD, SLOTS_PER_RECIPE } from '../constants/config';

export type Recipe = {
  id: string;
  name: string;
  /** Expected candy id (1..5) for each of the 6 slots. Deterministic. */
  need: number[];
};

/** 18 deterministic recipes — no RNG anywhere in the app. */
export const RECIPES: Recipe[] = [
  { id: 'r01', name: 'BERRY BONANZA', need: [1, 1, 2, 2, 3, 4] },
  { id: 'r02', name: 'GRAPE SWIRL', need: [1, 2, 1, 3, 1, 5] },
  { id: 'r03', name: 'MELON PARFAIT', need: [2, 2, 2, 4, 5, 1] },
  { id: 'r04', name: 'PLUM PUDDING', need: [3, 3, 1, 1, 4, 2] },
  { id: 'r05', name: 'BLUE DROP CUP', need: [4, 4, 2, 5, 1, 3] },
  { id: 'r06', name: 'HEART SUNDAE', need: [5, 5, 1, 2, 3, 4] },
  { id: 'r07', name: 'SUGAR TOWER', need: [1, 3, 5, 2, 4, 1] },
  { id: 'r08', name: 'CANDY RIBBON', need: [2, 1, 4, 3, 5, 2] },
  { id: 'r09', name: 'PINK AVALANCHE', need: [1, 1, 1, 5, 4, 3] },
  { id: 'r10', name: 'TUTTI FRUTTI', need: [3, 2, 5, 1, 2, 4] },
  { id: 'r11', name: 'FROSTED PLUM', need: [3, 4, 3, 2, 1, 5] },
  { id: 'r12', name: 'JELLY GARDEN', need: [4, 2, 1, 4, 3, 2] },
  { id: 'r13', name: 'COTTON CLOUD', need: [5, 1, 2, 5, 3, 1] },
  { id: 'r14', name: 'CARAMEL CRUSH', need: [2, 5, 4, 1, 1, 3] },
  { id: 'r15', name: 'RAINBOW SCOOP', need: [1, 2, 3, 4, 5, 1] },
  { id: 'r16', name: 'BUBBLE BERRY', need: [4, 1, 5, 3, 2, 4] },
  { id: 'r17', name: 'SWEET MOSAIC', need: [5, 3, 1, 2, 4, 5] },
  { id: 'r18', name: 'GRAND DESSERT', need: [1, 5, 2, 4, 3, 2] },
];

export const CANDY_IDS = [1, 2, 3, 4, 5];

export const CANDY_NAMES: Record<number, string> = {
  1: 'GRAPE',
  2: 'MELON',
  3: 'PLUM',
  4: 'DROP',
  5: 'HEART',
};

/** The 3 recipes of one board, rotating deterministically by round. */
export function getBoardRecipes(round: number): Recipe[] {
  const start = (Math.abs(round) * RECIPES_PER_BOARD) % RECIPES.length;
  const out: Recipe[] = [];
  for (let i = 0; i < RECIPES_PER_BOARD; i += 1) {
    out.push(RECIPES[(start + i) % RECIPES.length]);
  }
  return out;
}

/** How many of each candy a recipe asks for: { candyId: count }. */
export function recipeCounts(recipe: Recipe): Record<number, number> {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (let i = 0; i < recipe.need.length; i += 1) {
    const id = recipe.need[i];
    counts[id] = (counts[id] || 0) + 1;
  }
  return counts;
}

/** Candies still missing for the current fill state. */
export function remainingCounts(
  recipe: Recipe,
  slots: Array<number | null>,
): Record<number, number> {
  const counts = recipeCounts(recipe);
  for (let i = 0; i < SLOTS_PER_RECIPE; i += 1) {
    const filled = slots[i];
    if (filled != null) {
      counts[filled] = Math.max(0, (counts[filled] || 0) - 1);
    }
  }
  return counts;
}

export const emptySlots = (): Array<number | null> =>
  new Array(SLOTS_PER_RECIPE).fill(null);
