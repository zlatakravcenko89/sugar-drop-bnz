import React, { memo, useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { candySprite } from '../assets';
import { CANDY_IDS } from '../game/recipes';
import THEME from '../constants/theme';

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };
const CHIP = 58;
const SPRITE = 44;

type ChipProps = {
  candyId: number;
  count: number;
  selected: boolean;
  onSelect: (candyId: number) => void;
};

function CandyChipBase({ candyId, count, selected, onSelect }: ChipProps) {
  const lift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(lift, {
      toValue: selected ? 1 : 0,
      tension: THEME.animation.lift.tension,
      friction: THEME.animation.lift.friction,
      useNativeDriver: true,
    }).start();
  }, [lift, selected]);

  const translateY = lift.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });
  const scale = lift.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Candy ${candyId}, ${count} needed`}
      hitSlop={HIT_SLOP}
      onPress={() => onSelect(candyId)}
      style={styles.chipPress}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.chip,
          selected ? styles.chipOn : styles.chipOff,
          selected ? THEME.shadows.candy : THEME.shadows.clayLow,
          { transform: [{ translateY }, { scale }] },
        ]}>
        <Image source={candySprite(candyId)} style={styles.sprite} resizeMode="contain" />
      </Animated.View>
      <Text style={styles.count} numberOfLines={1}>
        {`x${count}`}
      </Text>
    </Pressable>
  );
}

const CandyChip = memo(CandyChipBase);

/** The 5-chip candy tray. Tap a chip to pick it up, tap it again to drop it. */
export function CandyTray({
  remaining,
  selectedId,
  onSelect,
}: {
  remaining: Record<number, number>;
  selectedId: number | null;
  onSelect: (candyId: number) => void;
}) {
  return (
    <View style={styles.row}>
      {CANDY_IDS.map(id => (
        <CandyChip
          key={`candy-${id}`}
          candyId={id}
          count={remaining[id] || 0}
          selected={selectedId === id}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chipPress: {
    width: CHIP,
    height: CHIP + 18,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chip: {
    width: CHIP,
    height: CHIP,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipOff: {
    backgroundColor: '#FFF4F8',
    borderColor: THEME.colors.ui.borderSoft,
  },
  chipOn: {
    backgroundColor: THEME.colors.bg.accent,
    borderColor: THEME.colors.candy.pink,
  },
  sprite: { width: SPRITE, height: SPRITE },
  count: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    lineHeight: 14,
    color: THEME.colors.text.secondary,
    fontVariant: ['tabular-nums'],
  },
});

export default CandyTray;
