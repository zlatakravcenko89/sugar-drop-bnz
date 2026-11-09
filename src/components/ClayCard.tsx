import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import THEME from '../constants/theme';

export type ClayTone = 'white' | 'tint' | 'glass';

const FILLS: Record<ClayTone, string> = {
  white: THEME.colors.bg.secondary,
  tint: THEME.colors.bg.tertiary,
  glass: THEME.colors.ui.glassFill,
};

const BORDERS: Record<ClayTone, string> = {
  white: THEME.colors.ui.borderSoft,
  tint: THEME.colors.ui.border,
  glass: THEME.colors.ui.glassBorder,
};

/**
 * Claymorphism surface: outer soft shadow + a simulated inner top light.
 * The highlight strip carries the card's top radii.
 */
export function ClayCard({
  children,
  style,
  tone = 'white',
  radius = THEME.radius.card,
  highlight = true,
}: {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  tone?: ClayTone;
  radius?: number;
  highlight?: boolean;
}) {
  return (
    <View
      style={[
        styles.base,
        THEME.shadows.clay,
        {
          backgroundColor: FILLS[tone],
          borderColor: BORDERS[tone],
          borderRadius: radius,
        },
        style,
      ]}>
      {highlight ? (
        <View
          pointerEvents="none"
          style={[
            styles.highlight,
            {
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
            },
          ]}
        />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1.5,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 34,
    backgroundColor: THEME.colors.ui.highlight,
  },
});

export default ClayCard;
