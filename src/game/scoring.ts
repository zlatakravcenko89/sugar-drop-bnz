import { COMBO_CAP, POINTS_PER_DROP, RECIPE_BONUS } from '../constants/config';

export function dropPoints(combo: number): number {
  return POINTS_PER_DROP * Math.max(1, combo);
}

export function nextCombo(combo: number): number {
  return Math.min(COMBO_CAP, Math.max(1, combo) + 1);
}

export function recipeBonus(recipeIndex: number): number {
  return RECIPE_BONUS * (recipeIndex + 1);
}
