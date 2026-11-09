import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import THEME from '../constants/theme';
import usePressScale from '../hooks/usePressScale';
import type { IconComp } from './PrimaryButton';

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };
const ICON = 22;

function TileBody({
  Icon,
  value,
  label,
  tint,
}: {
  Icon: IconComp;
  value: string;
  label: string;
  tint: string;
}) {
  return (
    <View style={styles.body}>
      <View style={styles.iconBox}>
        <Icon size={ICON} color={tint} strokeWidth={2.4} />
      </View>
      <Text style={[styles.value, { color: tint }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/**
 * Small Menu bento tile. Renders null when there is no value to show — an empty
 * rounded box reads as a broken skeleton loader.
 */
export function BentoTile({
  Icon,
  value,
  label,
  tint,
  onPress,
}: {
  Icon: IconComp;
  value: string;
  label: string;
  tint: string;
  onPress?: () => void;
}) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.96);

  if (!value) {
    return null;
  }

  if (!onPress) {
    return (
      <View style={styles.press}>
        <View style={[styles.tile, THEME.shadows.clay]}>
          <View pointerEvents="none" style={styles.topLight} />
          <TileBody Icon={Icon} value={value} label={label} tint={tint} />
        </View>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} ${value}`}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.press}>
      <Animated.View
        pointerEvents="box-none"
        style={[styles.tile, THEME.shadows.clay, { transform: [{ scale }] }]}>
        <View pointerEvents="none" style={styles.topLight} />
        <TileBody Icon={Icon} value={value} label={label} tint={tint} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: { width: '100%', height: 84 },
  tile: {
    width: '100%',
    height: '100%',
    backgroundColor: THEME.colors.bg.secondary,
    borderRadius: THEME.radius.card,
    borderWidth: 1.5,
    borderColor: THEME.colors.ui.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  topLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 26,
    borderTopLeftRadius: THEME.radius.card,
    borderTopRightRadius: THEME.radius.card,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  body: { alignItems: 'center', justifyContent: 'center', width: '100%' },
  iconBox: { width: ICON, height: ICON, alignItems: 'center', justifyContent: 'center' },
  value: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 24,
    fontVariant: ['tabular-nums'],
  },
  label: {
    marginTop: 1,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: THEME.colors.text.secondary,
  },
});

export default BentoTile;
