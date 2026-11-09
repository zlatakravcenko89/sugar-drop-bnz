import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import THEME from '../constants/theme';
import { HEADER_TOP_PAD } from '../constants/config';
import usePressScale from '../hooks/usePressScale';
import type { IconComp } from './PrimaryButton';

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

/**
 * The single header used by EVERY screen that has one (Menu / Game / Result /
 * Shelf). Screens only swap leftSlot / title / rightSlot, so padding, height
 * and badge treatment can never drift apart.
 */
export function ScreenHeader({
  title,
  subtitle,
  leftSlot,
  rightSlot,
  tone = 'dark',
  surface = false,
  style,
}: {
  title: string;
  subtitle?: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  tone?: 'dark' | 'light';
  surface?: boolean;
  style?: ViewStyle;
}) {
  const color = tone === 'light' ? '#FFFFFF' : THEME.colors.text.primary;

  return (
    <View style={[styles.wrap, surface ? styles.surface : null, style]}>
      <View style={styles.side}>{leftSlot}</View>
      <View style={styles.center}>
        <Text style={[styles.title, { color }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? <View style={styles.subtitle}>{subtitle}</View> : null}
      </View>
      <View style={styles.sideRight}>{rightSlot}</View>
    </View>
  );
}

/** 44x44 clay nav button — the same shape on every screen. */
export function NavButton({
  Icon,
  onPress,
  label,
  tone = 'dark',
}: {
  Icon: IconComp;
  onPress: () => void;
  label: string;
  tone?: 'dark' | 'light';
}) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.92);
  const glass = tone === 'light';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.navPress}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.navFill,
          glass ? styles.navGlass : styles.navLight,
          !glass ? THEME.shadows.clayLow : null,
          { transform: [{ scale }] },
        ]}>
        <Icon
          size={22}
          color={glass ? '#FFFFFF' : THEME.colors.candy.purple}
          strokeWidth={2.6}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: HEADER_TOP_PAD,
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  surface: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderBottomWidth: 1.5,
    borderBottomColor: THEME.colors.ui.borderSoft,
    shadowColor: THEME.colors.ui.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  side: { width: 44, alignItems: 'flex-start', justifyContent: 'center' },
  sideRight: { minWidth: 44, alignItems: 'flex-end', justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1.2,
    lineHeight: 22,
  },
  subtitle: { marginTop: 5, alignItems: 'center' },
  navPress: { width: 44, height: 44 },
  navFill: {
    width: 44,
    height: 44,
    borderRadius: THEME.radius.chip,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLight: {
    backgroundColor: '#FFFFFF',
    borderColor: THEME.colors.ui.border,
  },
  navGlass: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: THEME.colors.ui.glassBorder,
  },
});

export default ScreenHeader;
