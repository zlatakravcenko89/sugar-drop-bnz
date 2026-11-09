import React, { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { sprite1 } from '../assets';
import THEME from '../constants/theme';

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

/** The big Menu CTA tile — the primary action of the whole app. */
export function PlayTile({ onPress }: { onPress: () => void }) {
  const press = useRef(new Animated.Value(1)).current;
  const idle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(idle, { toValue: 1, duration: 1100, useNativeDriver: true }),
        Animated.timing(idle, { toValue: 0, duration: 1100, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [idle]);

  const idleScale = idle.interpolate({ inputRange: [0, 1], outputRange: [1, 1.025] });

  const onPressIn = () =>
    Animated.spring(press, {
      toValue: 0.96,
      tension: THEME.animation.press.tension,
      friction: THEME.animation.press.friction,
      useNativeDriver: true,
    }).start();

  const onPressOut = () =>
    Animated.spring(press, {
      toValue: 1,
      tension: THEME.animation.press.tension,
      friction: THEME.animation.press.friction,
      useNativeDriver: true,
    }).start();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Start baking"
      hitSlop={HIT_SLOP}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.press}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.tile,
          THEME.shadows.candy,
          { transform: [{ scale: press }, { scale: idleScale }] },
        ]}>
        <LinearGradient
          colors={THEME.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, styles.gradient]}
        />
        <View pointerEvents="none" style={styles.topLight} />
        <Image source={sprite1} style={styles.sprite} resizeMode="contain" />
        <Text style={styles.title} numberOfLines={1}>
          START BAKING
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          TAP · DROP · SERVE
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: { width: '100%', height: '100%', minHeight: 220 },
  tile: {
    width: '100%',
    height: '100%',
    borderRadius: THEME.radius.tile,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  gradient: { borderRadius: THEME.radius.tile - 2 },
  topLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 46,
    borderTopLeftRadius: THEME.radius.tile - 2,
    borderTopRightRadius: THEME.radius.tile - 2,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  sprite: { width: 104, height: 104, marginBottom: 10 },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.2,
    lineHeight: 24,
  },
  sub: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.85)',
  },
});

export default PlayTile;
