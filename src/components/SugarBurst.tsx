import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { BURST_MS } from '../constants/config';
import THEME from '../constants/theme';

const SPARK_ANGLES = [0, 60, 120, 180, 240, 300];

/** Ring + 6 sugar sparkles on a correct drop. Transform/opacity only. */
export function SugarBurst({ trigger, size }: { trigger: number; size: number }) {
  const ring = useRef(new Animated.Value(0)).current;
  const spark = useRef(new Animated.Value(0)).current;
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // 0 means "not this slot" — never replay the burst when the tick clears.
    if (trigger <= 0) {
      return;
    }
    ring.setValue(0);
    spark.setValue(0);
    Animated.parallel([
      Animated.timing(ring, {
        toValue: 1,
        duration: BURST_MS,
        useNativeDriver: true,
      }),
      Animated.timing(spark, {
        toValue: 1,
        duration: BURST_MS + 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [ring, spark, trigger]);

  const ringScale = ring.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1.6] });
  const ringOpacity = ring.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] });
  const sparkOpacity = spark.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0.9, 0],
  });

  return (
    <View pointerEvents="none" style={[styles.wrap, { width: size, height: size }]}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
      />
      {SPARK_ANGLES.map(angle => {
        const rad = (angle * Math.PI) / 180;
        const dist = size * 0.6;
        const tx = spark.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.cos(rad) * dist],
        });
        const ty = spark.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.sin(rad) * dist],
        });
        return (
          <Animated.View
            key={`spark-${angle}`}
            pointerEvents="none"
            style={[
              styles.spark,
              { opacity: sparkOpacity, transform: [{ translateX: tx }, { translateY: ty }] },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: THEME.colors.candy.pinkSoft,
  },
  spark: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
});

export default SugarBurst;
