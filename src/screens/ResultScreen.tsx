import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, ChefHat, Cookie, Sparkles, Star } from 'lucide-react-native';
import { COUNTUP_MS, SLOTS_PER_RECIPE } from '../constants/config';
import THEME from '../constants/theme';
import { formatScore } from '../utils/format';
import { saveBoard } from '../game/boardStore';
import type { GameResult } from '../hooks/useSugarGame';
import useCountUp from '../hooks/useCountUp';
import BoardThumb from '../components/BoardThumb';
import PrimaryButton from '../components/PrimaryButton';
import ScoreBadge from '../components/ScoreBadge';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader, { NavButton } from '../components/ScreenHeader';
import SecondaryButton from '../components/SecondaryButton';
import SectionHint from '../components/SectionHint';
import StatPill from '../components/StatPill';

const DOTS = [
  { left: 24, delay: 0 },
  { left: 68, delay: 120 },
  { left: 112, delay: 240 },
  { left: 156, delay: 60 },
  { left: 200, delay: 300 },
  { left: 244, delay: 180 },
  { left: 288, delay: 420 },
  { left: 46, delay: 540 },
  { left: 180, delay: 600 },
  { left: 268, delay: 360 },
];

function SugarDrift() {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(drift, { toValue: 1, duration: 2400, useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [drift]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {DOTS.map(dot => {
        const ty = drift.interpolate({ inputRange: [0, 1], outputRange: [0, -90] });
        const op = drift.interpolate({
          inputRange: [0, 0.25, 1],
          outputRange: [0, 0.8, 0],
        });
        return (
          <Animated.View
            key={`drift-${dot.left}-${dot.delay}`}
            pointerEvents="none"
            style={[
              styles.drop,
              { left: dot.left, opacity: op, transform: [{ translateY: ty }] },
            ]}
          />
        );
      })}
    </View>
  );
}

export function ResultScreen({
  result,
  onAgain,
  onMenu,
  onShelf,
}: {
  result: GameResult;
  onAgain: () => void;
  onMenu: () => void;
  onShelf: () => void;
}) {
  const cardScale = useRef(new Animated.Value(0.8)).current;
  const [saved, setSaved] = useState(false);
  const counted = useCountUp(result.score, COUNTUP_MS);

  useEffect(() => {
    Animated.spring(cardScale, {
      toValue: 1,
      tension: 46,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [cardScale]);

  const handleSave = () => {
    if (saved) {
      onShelf();
      return;
    }
    saveBoard({
      recipeName: result.recipeName,
      slots: result.slots,
      score: result.score,
    });
    setSaved(true);
  };

  const verdict = result.won ? 'BOARD SERVED!' : 'OUT OF HEARTS';

  return (
    <ScreenBackground variant="result">
      <ScreenHeader
        tone="light"
        title="BOARD RESULT"
        leftSlot={
          <NavButton Icon={ArrowLeft} onPress={onMenu} label="Back to menu" tone="light" />
        }
        rightSlot={<ScoreBadge value={result.score} tone="glass" />}
      />

      <View style={styles.body}>
        <SugarDrift />

        <View style={styles.sparkleRow}>
          <Sparkles size={16} color="#FFD166" strokeWidth={2.4} />
          <Sparkles size={20} color="#FFFFFF" strokeWidth={2.4} />
          <Sparkles size={16} color="#FFD166" strokeWidth={2.4} />
        </View>

        <Text style={styles.verdict} numberOfLines={1}>
          {verdict}
        </Text>

        <LinearGradient
          colors={THEME.gradients.gold}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.underline}
        />

        <Animated.View
          pointerEvents="none"
          style={[styles.preview, { transform: [{ scale: cardScale }] }]}>
          <View pointerEvents="none" style={styles.previewLight} />
          <BoardThumb slots={result.slots} cell={60} tone="glass" />
        </Animated.View>

        <View style={styles.statRow}>
          <View style={styles.statSlot}>
            <StatPill
              Icon={Star}
              value={formatScore(counted)}
              label="SWEET"
              tint="#FFD166"
              tone="glass"
            />
          </View>
          <View style={styles.statSlot}>
            <StatPill
              Icon={Sparkles}
              value={`x${result.bestCombo}`}
              label="COMBO"
              tint="#FFB3D9"
              tone="glass"
            />
          </View>
          <View style={styles.statSlot}>
            <StatPill
              Icon={Cookie}
              value={`${result.filled}/${SLOTS_PER_RECIPE}`}
              label="SLOTS"
              tint="#FFFFFF"
              tone="glass"
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.hintWrap}>
          <SectionHint
            text={result.won ? 'RECIPE COMPLETE · BAKE THE NEXT ONE' : 'TRY A SOFTER MIX'}
            tone="light"
          />
        </View>

        <PrimaryButton
          label="BAKE AGAIN"
          Icon={ChefHat}
          onPress={onAgain}
          colors={THEME.gradients.gold}
          textColor={THEME.colors.text.primary}
          height={60}
        />

        <View style={styles.row}>
          <View style={styles.flexBtn}>
            <SecondaryButton
              label={saved ? 'SAVED ✓' : 'SAVE TO SHELF'}
              onPress={handleSave}
              variant="glass"
              height={52}
              width="100%"
            />
          </View>
          <View style={styles.flexBtn}>
            <SecondaryButton
              label="MENU"
              onPress={onMenu}
              variant="glass"
              height={52}
              width="100%"
            />
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  drop: {
    position: 'absolute',
    bottom: 40,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  verdict: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 2,
    lineHeight: 40,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  underline: {
    marginTop: 12,
    width: 64,
    height: 4,
    borderRadius: 2,
  },
  preview: {
    marginTop: 18,
    padding: 16,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  statRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    alignSelf: 'stretch',
  },
  statSlot: { flex: 1 },
  footer: { paddingHorizontal: 20, paddingBottom: 30 },
  hintWrap: { marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12, marginTop: 12 },
  flexBtn: { flex: 1 },
});

export default ResultScreen;
