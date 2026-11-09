import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Candy, ChefHat, Settings, Trophy } from 'lucide-react-native';
import { logo } from '../assets';
import { BEST_BOARD, RECIPES_UNLOCKED } from '../constants/config';
import THEME from '../constants/theme';
import BentoTile from '../components/BentoTile';
import PlayTile from '../components/PlayTile';
import ScoreBadge from '../components/ScoreBadge';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader from '../components/ScreenHeader';
import SecondaryButton from '../components/SecondaryButton';
import SectionHint from '../components/SectionHint';
import usePressScale from '../hooks/usePressScale';

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

function BrandChip() {
  return (
    <View style={[styles.brandChip, THEME.shadows.clayLow]}>
      <Image source={logo} style={styles.brandLogo} resizeMode="contain" />
    </View>
  );
}

function RoundButton({
  onPress,
  active,
}: {
  onPress: () => void;
  active: boolean;
}) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.94);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={active ? 'Sound on' : 'Sound off'}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.roundPress}>
      <Animated.View
        pointerEvents="box-none"
        style={[styles.roundFill, THEME.shadows.clayLow, { transform: [{ scale }] }]}>
        <Settings
          size={22}
          color={active ? THEME.colors.candy.purple : THEME.colors.text.muted}
          strokeWidth={2.5}
        />
      </Animated.View>
    </Pressable>
  );
}

export function MenuScreen({
  score,
  savedCount,
  onPlay,
  onShelf,
}: {
  score: number;
  savedCount: number;
  onPlay: () => void;
  onShelf: () => void;
}) {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(-12)).current;
  const playScale = useRef(new Animated.Value(0.9)).current;
  const tileA = useRef(new Animated.Value(0)).current;
  const tileB = useRef(new Animated.Value(0)).current;
  const tileC = useRef(new Animated.Value(0)).current;
  const bottomOpacity = useRef(new Animated.Value(0)).current;
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const tileIn = (value: Animated.Value, delay: number) =>
      Animated.timing(value, { toValue: 1, duration: 320, delay, useNativeDriver: true });

    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(headerY, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.spring(playScale, {
        toValue: 1,
        delay: 80,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      tileIn(tileA, 160),
      tileIn(tileB, 240),
      tileIn(tileC, 320),
      Animated.timing(bottomOpacity, {
        toValue: 1,
        duration: 320,
        delay: 380,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bottomOpacity, headerOpacity, headerY, playScale, tileA, tileB, tileC]);

  const slide = (value: Animated.Value) =>
    value.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });

  return (
    <ScreenBackground variant="menu">
      <Animated.View
        pointerEvents="box-none"
        style={{ opacity: headerOpacity, transform: [{ translateY: headerY }] }}>
        <ScreenHeader
          title="SUGAR DROP"
          leftSlot={<BrandChip />}
          rightSlot={<ScoreBadge value={score} />}
        />
      </Animated.View>

      <View style={styles.grid}>
        <Animated.View
          pointerEvents="box-none"
          style={[styles.playCol, { transform: [{ scale: playScale }] }]}>
          <PlayTile onPress={onPlay} />
        </Animated.View>

        <View style={styles.sideCol}>
          <Animated.View
            pointerEvents="box-none"
            style={{ opacity: tileA, transform: [{ translateX: slide(tileA) }] }}>
            <BentoTile
              Icon={Trophy}
              value={String(BEST_BOARD)}
              label="BEST BOARD"
              tint={THEME.colors.candy.purple}
            />
          </Animated.View>

          <Animated.View
            pointerEvents="box-none"
            style={{ opacity: tileB, transform: [{ translateX: slide(tileB) }] }}>
            <BentoTile
              Icon={Candy}
              value={String(savedCount)}
              label="SAVED"
              tint={THEME.colors.candy.pink}
              onPress={onShelf}
            />
          </Animated.View>

          <Animated.View
            pointerEvents="box-none"
            style={{ opacity: tileC, transform: [{ translateX: slide(tileC) }] }}>
            <BentoTile
              Icon={ChefHat}
              value={String(RECIPES_UNLOCKED)}
              label="UNLOCKED"
              tint={THEME.colors.candy.caramel}
            />
          </Animated.View>
        </View>
      </View>

      <Animated.View pointerEvents="box-none" style={{ opacity: bottomOpacity }}>
        <View style={styles.hintWrap}>
          <SectionHint text="HOW TO PLAY · TAP A CANDY, TAP A SLOT" />
        </View>
        <View style={styles.bottomBar}>
          <View style={styles.flexBtn}>
            <SecondaryButton
              label="SWEET SHELF"
              Icon={Candy}
              onPress={onShelf}
              variant="light"
              height={52}
              width="100%"
            />
          </View>
          <RoundButton onPress={() => setSoundOn(prev => !prev)} active={soundOn} />
        </View>
      </Animated.View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  brandChip: {
    width: 44,
    height: 44,
    borderRadius: THEME.radius.chip,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME.colors.ui.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogo: { width: 32, height: 32 },
  grid: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    marginTop: 12,
  },
  playCol: { flex: 1.35 },
  sideCol: { flex: 1, justifyContent: 'space-between', gap: 12 },
  hintWrap: { paddingHorizontal: 18, marginTop: 14 },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingBottom: 26,
    marginTop: 10,
  },
  flexBtn: { flex: 1 },
  roundPress: { width: 52, height: 52 },
  roundFill: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1.5,
    borderColor: THEME.colors.ui.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MenuScreen;
