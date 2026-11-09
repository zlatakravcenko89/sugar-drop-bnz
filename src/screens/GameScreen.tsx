import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ArrowLeft, Cookie, Sparkles, Star, Utensils } from 'lucide-react-native';
import THEME from '../constants/theme';
import { CONTROLS_H } from '../constants/config';
import { formatScore } from '../utils/format';
import useSugarGame, { type GameResult } from '../hooks/useSugarGame';
import CandyTray from '../components/CandyTray';
import HeartsRow from '../components/HeartsRow';
import PrimaryButton from '../components/PrimaryButton';
import RecipeBoard from '../components/RecipeBoard';
import RecipeCard from '../components/RecipeCard';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader, { NavButton } from '../components/ScreenHeader';
import SectionHint from '../components/SectionHint';
import StatPill from '../components/StatPill';

function ProgressDots({ total, done }: { total: number; done: number }) {
  const dots = [];
  for (let i = 0; i < total; i += 1) {
    dots.push(
      <View
        key={`dot-${i}`}
        style={[styles.dot, i <= done ? styles.dotOn : styles.dotOff]}
      />,
    );
  }
  return <View style={styles.dotRow}>{dots}</View>;
}

export function GameScreen({
  round,
  startScore,
  onExit,
  onGameOver,
}: {
  round: number;
  startScore: number;
  onExit: () => void;
  onGameOver: (result: GameResult) => void;
}) {
  const game = useSugarGame(round, startScore, onGameOver);
  const enterOpacity = useRef(new Animated.Value(0)).current;
  const enterY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(enterOpacity, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.timing(enterY, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start();
  }, [enterOpacity, enterY]);

  return (
    <ScreenBackground variant="game">
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.screen,
          { opacity: enterOpacity, transform: [{ translateY: enterY }] },
        ]}>
        <ScreenHeader
          surface
          title={`BOARD ${game.recipeIndex + 1} / ${game.recipeTotal}`}
          subtitle={
            <ProgressDots total={game.recipeTotal} done={game.recipeIndex} />
          }
          leftSlot={<NavButton Icon={ArrowLeft} onPress={onExit} label="Back to menu" />}
          rightSlot={<HeartsRow total={game.heartsTotal} alive={game.hearts} />}
        />

        <View style={styles.area}>
          <RecipeCard recipe={game.recipe} />
          <View style={styles.boardWrap}>
            <RecipeBoard
              need={game.recipe.need}
              slots={game.slots}
              selected={game.selected}
              feedbackCorrect={game.feedback.correctSlot}
              feedbackWrong={game.feedback.wrongSlot}
              feedbackTick={game.feedback.tick}
              onSlotPress={game.pressSlot}
            />
          </View>

          <View style={styles.statRow}>
            <View style={styles.statSlot}>
              <StatPill
                Icon={Star}
                value={formatScore(game.score)}
                label="SWEET"
                tint={THEME.colors.candy.pink}
              />
            </View>
            <View style={styles.statSlot}>
              <StatPill
                Icon={Sparkles}
                value={`x${game.combo}`}
                label="COMBO"
                tint={THEME.colors.candy.purple}
              />
            </View>
            <View style={styles.statSlot}>
              <StatPill
                Icon={Cookie}
                value={`${game.filledCount}/${game.slotTotal}`}
                label="SLOTS"
                tint={THEME.colors.candy.caramel}
              />
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <View pointerEvents="none" style={styles.panelLight} />
          <CandyTray
            remaining={game.remaining}
            selectedId={game.selected}
            onSelect={game.selectCandy}
          />
          <View style={styles.hintWrap}>
            <SectionHint
              text={
                game.boardComplete
                  ? 'BOARD READY · SERVE IT'
                  : 'TAP A CANDY · THEN TAP A SLOT'
              }
            />
          </View>
          <PrimaryButton
            label="SERVE BOARD"
            Icon={Utensils}
            onPress={game.serveBoard}
            disabled={!game.boardComplete}
            height={56}
          />
        </View>
      </Animated.View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  area: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  boardWrap: { marginTop: 10 },
  statRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  statSlot: { flex: 1 },
  dotRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotOn: { backgroundColor: THEME.colors.candy.pink },
  dotOff: { backgroundColor: THEME.colors.ui.border },
  panel: {
    height: CONTROLS_H,
    borderTopLeftRadius: THEME.radius.tile,
    borderTopRightRadius: THEME.radius.tile,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderTopWidth: 1.5,
    borderTopColor: THEME.colors.ui.borderSoft,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 18,
    shadowColor: THEME.colors.ui.shadow,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  panelLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    borderTopLeftRadius: THEME.radius.tile,
    borderTopRightRadius: THEME.radius.tile,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  hintWrap: { marginTop: 8, marginBottom: 8 },
});

export default GameScreen;
