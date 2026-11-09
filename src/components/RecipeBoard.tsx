import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BOARD_BORDER,
  BOARD_H,
  BOARD_PAD,
  BOARD_W,
  SLOTS_PER_RECIPE,
} from '../constants/config';
import THEME from '../constants/theme';
import CandySlot from './CandySlot';

/**
 * The 3x2 recipe board. Geometry comes straight from the frame formula in
 * config.ts, so the slots always fit the container exactly (overflow 0).
 */
export function RecipeBoard({
  need,
  slots,
  selected,
  feedbackCorrect,
  feedbackWrong,
  feedbackTick,
  onSlotPress,
}: {
  need: number[];
  slots: Array<number | null>;
  selected: number | null;
  feedbackCorrect: number;
  feedbackWrong: number;
  feedbackTick: number;
  onSlotPress: (index: number) => void;
}) {
  const cells = [];
  for (let i = 0; i < SLOTS_PER_RECIPE; i += 1) {
    const expected = need[i];
    const filled = slots[i];
    const pulsing = selected != null && filled == null && expected === selected;
    cells.push(
      <CandySlot
        key={`slot-${i}`}
        index={i}
        expected={expected}
        filled={filled}
        pulsing={pulsing}
        correctTick={feedbackCorrect === i ? feedbackTick : 0}
        wrongTick={feedbackWrong === i ? feedbackTick : 0}
        onPress={onSlotPress}
      />,
    );
  }

  return (
    <View style={[styles.board, THEME.shadows.clayHigh]}>
      <LinearGradient
        colors={THEME.gradients.board}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, styles.gradient]}
      />
      <View style={styles.grid}>{cells}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: BOARD_W,
    height: BOARD_H,
    padding: BOARD_PAD,
    borderWidth: BOARD_BORDER,
    borderColor: THEME.colors.ui.border,
    borderRadius: THEME.radius.board,
    alignSelf: 'center',
  },
  gradient: { borderRadius: THEME.radius.board - BOARD_BORDER },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecipeBoard;
