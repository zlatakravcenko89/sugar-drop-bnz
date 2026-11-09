import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, Candy, ChefHat } from 'lucide-react-native';
import { SHELF_CARD, SHELF_MAX_CARDS } from '../constants/config';
import THEME from '../constants/theme';
import { formatScore } from '../utils/format';
import type { SavedBoard } from '../game/boardStore';
import BoardThumb from '../components/BoardThumb';
import PrimaryButton from '../components/PrimaryButton';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader, { NavButton } from '../components/ScreenHeader';
import SectionHint from '../components/SectionHint';

function CountPill({ count }: { count: number }) {
  return (
    <View style={[styles.countPill, THEME.shadows.clayLow]}>
      <View style={styles.countIcon}>
        <Candy size={18} color={THEME.colors.candy.pink} strokeWidth={2.4} />
      </View>
      <Text style={styles.countText} numberOfLines={1}>
        {String(count)}
      </Text>
    </View>
  );
}

function ShelfCard({ board }: { board: SavedBoard }) {
  return (
    <View style={[styles.card, THEME.shadows.clay]}>
      <View pointerEvents="none" style={styles.cardLight} />
      <BoardThumb slots={board.slots} cell={40} tone="light" />
      <Text style={styles.cardName} numberOfLines={1}>
        {board.recipeName}
      </Text>
      <Text style={styles.cardScore} numberOfLines={1}>
        {formatScore(board.score)}
      </Text>
    </View>
  );
}

export function BoardsScreen({
  boards,
  onBack,
  onPlay,
}: {
  boards: SavedBoard[];
  onBack: () => void;
  onPlay: () => void;
}) {
  const shown = boards.slice(0, SHELF_MAX_CARDS);
  const more = Math.max(0, boards.length - shown.length);

  return (
    <ScreenBackground variant="shelf">
      <ScreenHeader
        title="SWEET SHELF"
        leftSlot={<NavButton Icon={ArrowLeft} onPress={onBack} label="Back to menu" />}
        rightSlot={<CountPill count={boards.length} />}
      />

      <View style={styles.body}>
        {shown.length > 0 ? (
          <View style={styles.grid}>
            {shown.map(board => (
              <ShelfCard key={board.id} board={board} />
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <Candy size={56} color={THEME.colors.ui.border} strokeWidth={2} />
            <Text style={styles.emptyTitle} numberOfLines={1}>
              NO BOARDS YET
            </Text>
            <Text style={styles.emptyText} numberOfLines={2}>
              FINISH A RECIPE TO SAVE IT HERE
            </Text>
          </View>
        )}

        {more > 0 ? (
          <Text style={styles.more} numberOfLines={1}>
            {`+${more} MORE`}
          </Text>
        ) : null}
      </View>

      <View style={styles.footer}>
        <View style={styles.hintWrap}>
          <SectionHint text="SAVED BOARDS LIVE FOR THIS SESSION" />
        </View>
        <PrimaryButton label="START BAKING" Icon={ChefHat} onPress={onPlay} height={56} />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 16, paddingTop: 10, alignItems: 'center' },
  grid: {
    width: SHELF_CARD * 2 + 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  card: {
    width: SHELF_CARD,
    backgroundColor: THEME.colors.bg.secondary,
    borderRadius: THEME.radius.card,
    borderWidth: 1.5,
    borderColor: THEME.colors.ui.borderSoft,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  cardLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 26,
    borderTopLeftRadius: THEME.radius.card,
    borderTopRightRadius: THEME.radius.card,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  cardName: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    lineHeight: 16,
    color: THEME.colors.text.primary,
  },
  cardScore: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
    color: THEME.colors.candy.purple,
    fontVariant: ['tabular-nums'],
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.2,
    lineHeight: 20,
    color: THEME.colors.text.secondary,
  },
  emptyText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    lineHeight: 16,
    textAlign: 'center',
    color: THEME.colors.text.secondary,
  },
  more: {
    marginTop: 12,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: THEME.colors.text.secondary,
  },
  countPill: {
    height: 40,
    minWidth: 64,
    paddingHorizontal: 14,
    borderRadius: THEME.radius.pill,
    borderWidth: 1.5,
    borderColor: THEME.colors.ui.border,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  countIcon: { width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  countText: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
    color: THEME.colors.candy.purple,
    fontVariant: ['tabular-nums'],
  },
  footer: { paddingHorizontal: 16, paddingBottom: 28 },
  hintWrap: { marginBottom: 12 },
});

export default BoardsScreen;
