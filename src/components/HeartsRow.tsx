import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Heart } from 'lucide-react-native';
import THEME from '../constants/theme';

const SIZE = 20;

function SugarHeart({ alive, index }: { alive: boolean; index: number }) {
  const scale = useRef(new Animated.Value(1)).current;
  const prevAlive = useRef(alive);

  useEffect(() => {
    if (prevAlive.current && !alive) {
      scale.setValue(1.3);
      Animated.timing(scale, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
    prevAlive.current = alive;
  }, [alive, scale]);

  const color = alive ? THEME.colors.candy.heart : THEME.colors.candy.heartDead;

  return (
    <Animated.View
      key={`heart-${index}`}
      pointerEvents="none"
      style={[styles.slot, { transform: [{ scale }] }]}>
      <Heart size={SIZE} color={color} fill={color} strokeWidth={2} />
    </Animated.View>
  );
}

export function HeartsRow({ total, alive }: { total: number; alive: number }) {
  const items = [];
  for (let i = 0; i < total; i += 1) {
    items.push(<SugarHeart key={`h-${i}`} index={i} alive={i < alive} />);
  }
  return (
    <View style={styles.row} accessibilityLabel={`${alive} of ${total} hearts left`}>
      {items}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  slot: { width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' },
});

export default HeartsRow;
