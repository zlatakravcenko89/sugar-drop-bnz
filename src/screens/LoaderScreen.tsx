import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { logo } from '../assets';
import {
  LOADER_BAR_H,
  LOADER_BAR_MS,
  LOADER_BAR_W,
  LOADER_DURATION_MS,
} from '../constants/config';
import THEME from '../constants/theme';
import ScreenBackground from '../components/ScreenBackground';

/**
 * Splash. Deliberately the ONLY dark screen in the app so it can never be
 * confused with the light-pink Menu. Non-interactive brand card: no chips, no CTA here.
 */
export function LoaderScreen({ onDone }: { onDone: () => void }) {
  const cardScale = useRef(new Animated.Value(0.72)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(18)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subOpacity = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(cardScale, {
        toValue: 1,
        tension: THEME.animation.soft.tension,
        friction: THEME.animation.soft.friction,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(titleY, {
        toValue: 0,
        duration: 460,
        delay: 260,
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 460,
        delay: 260,
        useNativeDriver: true,
      }),
      Animated.timing(subOpacity, {
        toValue: 1,
        duration: 420,
        delay: 420,
        useNativeDriver: true,
      }),
      Animated.timing(bar, {
        toValue: 1,
        duration: LOADER_BAR_MS,
        useNativeDriver: true,
      }),
    ]).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 0, duration: 900, useNativeDriver: true }),
      ]),
    );
    loop.start();

    const fadeTimer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: THEME.animation.fade,
        useNativeDriver: true,
      }).start();
    }, Math.max(0, LOADER_DURATION_MS - THEME.animation.fade));

    const doneTimer = setTimeout(onDone, LOADER_DURATION_MS);

    return () => {
      loop.stop();
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [bar, breathe, cardOpacity, cardScale, onDone, screenOpacity, subOpacity, titleOpacity, titleY]);

  const breatheScale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.04],
  });
  const barTranslate = bar.interpolate({
    inputRange: [0, 1],
    outputRange: [-LOADER_BAR_W, 0],
  });

  return (
    <ScreenBackground variant="loader">
      <Animated.View
        pointerEvents="box-none"
        style={[styles.screen, { opacity: screenOpacity }]}>
        <View style={styles.center}>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.brandCard,
              {
                opacity: cardOpacity,
                transform: [{ scale: cardScale }, { scale: breatheScale }],
              },
            ]}>
            <View pointerEvents="none" style={styles.brandLight} />
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </Animated.View>

          <Animated.Text
            style={[
              styles.title,
              { opacity: titleOpacity, transform: [{ translateY: titleY }] },
            ]}
            numberOfLines={1}>
            SUGAR DROP
          </Animated.Text>

          <Animated.Text style={[styles.subtitle, { opacity: subOpacity }]} numberOfLines={1}>
            SWEET BONANZA DESSERT BOARDS
          </Animated.Text>

          <View style={styles.barTrack}>
            <Animated.View
              pointerEvents="none"
              style={[styles.barFill, { transform: [{ translateX: barTranslate }] }]}>
              <LinearGradient
                colors={THEME.gradients.progress}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.barGradient}
              />
            </Animated.View>
          </View>

          <Text style={styles.loading} numberOfLines={1}>
            LOADING...
          </Text>
        </View>
      </Animated.View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  brandCard: {
    width: 164,
    height: 164,
    borderRadius: THEME.radius.brand,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.colors.candy.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 14,
  },
  brandLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 34,
    borderTopLeftRadius: THEME.radius.brand,
    borderTopRightRadius: THEME.radius.brand,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  logo: { width: 112, height: 112 },
  title: {
    marginTop: 30,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 3,
    lineHeight: 50,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: THEME.colors.candy.pink,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.4,
    lineHeight: 16,
    color: THEME.colors.loader.sugar,
    opacity: 0.85,
    textAlign: 'center',
  },
  barTrack: {
    marginTop: 34,
    width: LOADER_BAR_W,
    height: LOADER_BAR_H,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.14)',
    overflow: 'hidden',
  },
  barFill: {
    width: LOADER_BAR_W,
    height: LOADER_BAR_H,
    borderRadius: 4,
    shadowColor: THEME.colors.candy.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  barGradient: { flex: 1, borderRadius: 4 },
  loading: {
    marginTop: 14,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    lineHeight: 15,
    color: 'rgba(255,255,255,0.65)',
  },
});

export default LoaderScreen;
