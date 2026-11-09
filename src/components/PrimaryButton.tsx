import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import THEME from '../constants/theme';
import usePressScale from '../hooks/usePressScale';

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };
export const ICON_SIZE = 24;

export type IconComp = React.ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
}>;

export function PrimaryButton({
  label,
  Icon,
  onPress,
  disabled = false,
  height = 60,
  colors,
  textColor = THEME.colors.text.onAccent,
  style,
}: {
  label: string;
  Icon?: IconComp;
  onPress: () => void;
  disabled?: boolean;
  height?: number;
  colors?: string[];
  textColor?: string;
  style?: ViewStyle;
}) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.96);
  const gradient = disabled
    ? THEME.gradients.disabled
    : colors || THEME.gradients.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.press, { width: '100%', height }, style]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.fill,
          THEME.shadows.candy,
          { height, opacity: disabled ? 0.45 : 1, transform: [{ scale }] },
        ]}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View pointerEvents="none" style={styles.topLight} />
        <View style={styles.row}>
          {Icon ? (
            <View style={styles.iconBox}>
              <Icon size={ICON_SIZE} color={textColor} strokeWidth={2.4} />
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
  press: {
    alignSelf: 'stretch',
  },
  fill: {
    width: '100%',
    borderRadius: THEME.radius.btn,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 22,
    backgroundColor: 'rgba(255,255,255,0.22)',
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
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1.2,
    lineHeight: ICON_SIZE,
  },
});

export default PrimaryButton;
