import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { candySprite } from '../assets';
import { COLS, SLOTS_PER_RECIPE } from '../constants/config';
import THEME from '../constants/theme';

/** Mini 3x2 render of a finished board. Shared by ResultScreen and the Shelf. */
export function BoardThumb({
  slots,
  cell,
  tone = 'light',
}: {
  slots: Array<number | null>;
  cell: number;
  tone?: 'light' | 'glass';
}) {
  const glass = tone === 'glass';
  const gutter = Math.max(3, Math.round(cell * 0.08));
  const sprite = cell - gutter * 2;
  const cells = [];

  for (let i = 0; i < SLOTS_PER_RECIPE; i += 1) {
    const candy = slots[i];
    cells.push(
      <View
        key={`thumb-${i}`}
        style={[
          styles.cell,
          glass ? styles.cellGlass : styles.cellLight,
          { width: cell, height: cell, borderRadius: Math.round(cell * 0.28) },
        ]}>
        {candy != null ? (
          <Image
            source={candySprite(candy)}
            style={{ width: sprite, height: sprite }}
            resizeMode="contain"
          />
        ) : null}
      </View>,
    );
  }

  return <View style={[styles.grid, { width: cell * COLS }]}>{cells}</View>;
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  cellLight: {
    backgroundColor: THEME.colors.bg.tertiary,
    borderColor: THEME.colors.ui.border,
  },
  cellGlass: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderColor: 'rgba(255,255,255,0.3)',
  },
});

export default BoardThumb;
