import React, { memo, useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { candySprite } from '../assets';
import { SHAKE_MS, SLOT, SLOT_SPRITE, TILE } from '../constants/config';
import THEME from '../constants/theme';
import SugarBurst from './SugarBurst';

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export type CandySlotProps = {
  index: number;
  expected: number;
  filled: number | null;
  pulsing: boolean;
  correctTick: number;
  wrongTick: number;
  onPress: (index: number) => void;
};

function CandySlotBase({
  index,
  expected,
  filled,
  pulsing,
  correctTick,
  wrongTick,
  onPress,
}: CandySlotProps) {
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(filled != null ? 1 : 0)).current;
  const halo = useRef(new Animated.Value(0)).current;
  const firstWrong = useRef(true);

  useEffect(() => {
    if (firstWrong.current) {
      firstWrong.current = false;
      return;
    }
    if (wrongTick <= 0) {
      return;
    }
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: SHAKE_MS / 6, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: SHAKE_MS / 6, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 1, duration: SHAKE_MS / 6, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: SHAKE_MS / 6, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: SHAKE_MS / 6, useNativeDriver: true }),
    ]).start();
  }, [shake, wrongTick]);

  useEffect(() => {
    if (filled == null) {
      pop.setValue(0);
      return;
    }
    pop.setValue(0.35);
    Animated.spring(pop, {
      toValue: 1,
      tension: 60,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [filled, pop]);

  useEffect(() => {
    if (!pulsing) {
      halo.stopAnimation();
      halo.setValue(0);
      return;
    }
    halo.setValue(0.25);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(halo, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(halo, { toValue: 0.25, duration: 400, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [halo, pulsing]);

  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-7, 7] });
  const isFilled = filled != null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isFilled ? `Filled slot ${index + 1}` : `Empty slot ${index + 1}`}
      hitSlop={HIT_SLOP}
      onPress={() => onPress(index)}
      style={styles.cell}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.slot,
          isFilled ? styles.slotFilled : styles.slotEmpty,
          { transform: [{ translateX }] },
        ]}>
        {pulsing ? (
          <Animated.View pointerEvents="none" style={[styles.halo, { opacity: halo }]} />
        ) : null}

        {isFilled ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.spriteBox, { transform: [{ scale: pop }] }]}>
            <Image
              source={candySprite(filled as number)}
              style={styles.sprite}
              resizeMode="contain"
            />
          </Animated.View>
        ) : (
          <View pointerEvents="none" style={styles.ghostBox}>
            <Image source={candySprite(expected)} style={styles.ghost} resizeMode="contain" />
          </View>
        )}

        <SugarBurst trigger={correctTick} size={SLOT} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: TILE,
    height: TILE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slot: {
    width: SLOT,
    height: SLOT,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotEmpty: {
    backgroundColor: THEME.colors.bg.tertiary,
    borderColor: THEME.colors.ui.border,
  },
  slotFilled: {
    backgroundColor: 'rgba(255,105,180,0.10)',
    borderColor: THEME.colors.candy.pink,
  },
  halo: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: THEME.colors.candy.pink,
  },
  spriteBox: {
    width: SLOT_SPRITE,
    height: SLOT_SPRITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: { width: SLOT_SPRITE, height: SLOT_SPRITE },
  ghostBox: {
    width: SLOT_SPRITE,
    height: SLOT_SPRITE,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.18,
  },
  ghost: { width: SLOT_SPRITE, height: SLOT_SPRITE },
});

export const CandySlot = memo(CandySlotBase);
export default CandySlot;
