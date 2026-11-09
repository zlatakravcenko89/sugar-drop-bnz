import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FLIGHT_MS,
  HEARTS_PER_BOARD,
  RECIPES_PER_BOARD,
  SHAKE_MS,
  SLOTS_PER_RECIPE,
} from '../constants/config';
import {
  emptySlots,
  getBoardRecipes,
  remainingCounts,
  type Recipe,
} from '../game/recipes';
import { dropPoints, nextCombo, recipeBonus } from '../game/scoring';

export type GameResult = {
  won: boolean;
  score: number;
  gained: number;
  bestCombo: number;
  filled: number;
  recipeName: string;
  slots: Array<number | null>;
};

export type DropFeedback = {
  /** Slot index of the last correct drop, -1 when none. */
  correctSlot: number;
  /** Slot index of the last wrong drop, -1 when none. */
  wrongSlot: number;
  /** Monotonic tick so children can react to repeated drops on the same slot. */
  tick: number;
};

const NO_FEEDBACK: DropFeedback = { correctSlot: -1, wrongSlot: -1, tick: 0 };

export function useSugarGame(
  round: number,
  startScore: number,
  onGameOver: (result: GameResult) => void,
) {
  const recipes = useMemo<Recipe[]>(() => getBoardRecipes(round), [round]);

  const [recipeIndex, setRecipeIndex] = useState(0);
  const [slots, setSlots] = useState<Array<number | null>>(emptySlots);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(startScore);
  const [combo, setCombo] = useState(1);
  const [hearts, setHearts] = useState(HEARTS_PER_BOARD);
  const [feedback, setFeedback] = useState<DropFeedback>(NO_FEEDBACK);

  /** Mutable gameplay guards live in refs — never in state. */
  const isAnimating = useRef(false);
  const isOver = useRef(false);
  const bestCombo = useRef(1);
  const gained = useRef(0);
  const tick = useRef(0);

  const recipe = recipes[Math.min(recipeIndex, recipes.length - 1)];

  const filledCount = useMemo(
    () => slots.reduce<number>((acc, s) => acc + (s != null ? 1 : 0), 0),
    [slots],
  );

  const remaining = useMemo(
    () => remainingCounts(recipe, slots),
    [recipe, slots],
  );

  const boardComplete = filledCount === SLOTS_PER_RECIPE;

  const finish = useCallback(
    (won: boolean, finalScore: number, finalSlots: Array<number | null>) => {
      if (isOver.current) {
        return;
      }
      isOver.current = true;
      onGameOver({
        won,
        score: finalScore,
        gained: gained.current,
        bestCombo: bestCombo.current,
        filled: finalSlots.reduce<number>(
          (acc, s) => acc + (s != null ? 1 : 0),
          0,
        ),
        recipeName: recipe.name,
        slots: finalSlots,
      });
    },
    [onGameOver, recipe.name],
  );

  const selectCandy = useCallback(
    (candyId: number) => {
      if (isAnimating.current || isOver.current) {
        return;
      }
      setSelected(prev => (prev === candyId ? null : candyId));
    },
    [],
  );

  const pressSlot = useCallback(
    (index: number) => {
      if (isAnimating.current || isOver.current) {
        return;
      }
      if (index < 0 || index >= SLOTS_PER_RECIPE) {
        return;
      }
      if (slots[index] != null) {
        return;
      }
      const candyId = selected;
      if (candyId == null) {
        return;
      }

      tick.current += 1;
      const expected = recipe.need[index];

      if (expected === candyId) {
        isAnimating.current = true;
        const points = dropPoints(combo);
        const updated = slots.slice();
        updated[index] = candyId;
        gained.current += points;

        setSlots(updated);
        setScore(prev => prev + points);
        setCombo(prev => {
          const nx = nextCombo(prev);
          bestCombo.current = Math.max(bestCombo.current, nx);
          return nx;
        });
        setSelected(null);
        setFeedback({ correctSlot: index, wrongSlot: -1, tick: tick.current });

        setTimeout(() => {
          isAnimating.current = false;
        }, FLIGHT_MS);
        return;
      }

      isAnimating.current = true;
      const heartsLeft = Math.max(0, hearts - 1);
      setCombo(1);
      setSelected(null);
      setFeedback({ correctSlot: -1, wrongSlot: index, tick: tick.current });
      setHearts(heartsLeft);

      if (heartsLeft === 0) {
        finish(false, score, slots);
        return;
      }

      setTimeout(() => {
        isAnimating.current = false;
      }, SHAKE_MS);
    },
    [combo, finish, hearts, recipe.need, score, selected, slots],
  );

  const serveBoard = useCallback(() => {
    if (isAnimating.current || isOver.current || !boardComplete) {
      return;
    }
    const bonus = recipeBonus(recipeIndex);
    gained.current += bonus;
    const servedSlots = slots.slice();
    const total = score + bonus;

    if (recipeIndex >= RECIPES_PER_BOARD - 1) {
      setScore(total);
      finish(true, total, servedSlots);
      return;
    }

    isAnimating.current = true;
    setScore(total);
    setRecipeIndex(prev => prev + 1);
    setSlots(emptySlots());
    setSelected(null);
    setFeedback(NO_FEEDBACK);
    setTimeout(() => {
      isAnimating.current = false;
    }, FLIGHT_MS);
  }, [boardComplete, finish, recipeIndex, score, slots]);

  return {
    recipe,
    recipeIndex,
    recipeTotal: RECIPES_PER_BOARD,
    slots,
    selected,
    score,
    combo,
    hearts,
    heartsTotal: HEARTS_PER_BOARD,
    filledCount,
    slotTotal: SLOTS_PER_RECIPE,
    remaining,
    boardComplete,
    feedback,
    selectCandy,
    pressSlot,
    serveBoard,
  };
}

export default useSugarGame;
