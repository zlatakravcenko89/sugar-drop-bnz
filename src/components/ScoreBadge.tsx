import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Star } from 'lucide-react-native';
import THEME from '../constants/theme';
import { formatScore } from '../utils/format';

/** Sweet-score pill. Pops on every value change (transform only). */
export function ScoreBadge({
  value,
  tone = 'light',
}: {
  value: number;
  tone?: 'light' | 'glass';
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    scale.setValue(1.18);
    Animated.spring(scale, {
      toValue: 1,
      tension: THEME.animation.pop.tension,
      friction: THEME.animation.pop.friction,
      useNativeDriver: true,
    }).start();
  }, [scale, value]);

  const glass = tone === 'glass';

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.pill,
        glass ? styles.glass : styles.light,
        !glass ? THEME.shadows.clayLow : null,
        { transform: [{ scale }] },
      ]}>
      <View style={styles.iconBox}>
        <Star
          size={18}
          color={glass ? '#FFD166' : THEME.colors.candy.pink}
          fill={glass ? '#FFD166' : THEME.colors.candy.pink}
          strokeWidth={2}
        />
      </View>
      <Text
        style={[
          styles.value,
          { color: glass ? '#FFFFFF' : THEME.colors.candy.purple },
        ]}
        numberOfLines={1}>
        {formatScore(value)}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: THEME.radius.pill,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  light: { backgroundColor: '#FFFFFF', borderColor: THEME.colors.ui.border },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: THEME.colors.ui.glassBorder,
  },
  iconBox: { width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  value: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
    fontVariant: ['tabular-nums'],
  },
});

export default ScoreBadge;
