import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import THEME from '../constants/theme';
import usePressScale from '../hooks/usePressScale';
import { ICON_SIZE, type IconComp } from './PrimaryButton';

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export function SecondaryButton({
  label,
  Icon,
  onPress,
  variant = 'light',
  height = 52,
  width = '100%',
  iconColor,
  style,
}: {
  label: string;
  Icon?: IconComp;
  onPress: () => void;
  variant?: 'light' | 'glass';
  height?: number;
  width?: ViewStyle['width'];
  iconColor?: string;
  style?: ViewStyle;
}) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.96);
  const glass = variant === 'glass';
  const textColor = glass ? THEME.colors.text.onAccent : THEME.colors.text.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[{ width, height }, style]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.fill,
          glass ? styles.glass : styles.light,
          !glass ? THEME.shadows.clayLow : null,
          { height, transform: [{ scale }] },
        ]}>
        <View style={styles.row}>
          {Icon ? (
            <View style={styles.iconBox}>
              <Icon
                size={ICON_SIZE}
                color={iconColor || (glass ? '#FFFFFF' : THEME.colors.candy.pink)}
                strokeWidth={2.4}
              />
            </View>
          ) : null}
          <Text style={[styles.label, { color: textColor }]} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fill: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderColor: THEME.colors.ui.border,
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderColor: THEME.colors.ui.glassBorder,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  iconBox: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
    lineHeight: ICON_SIZE,
  },
});

export default SecondaryButton;
