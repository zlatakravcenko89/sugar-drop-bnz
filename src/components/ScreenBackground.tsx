import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { bgGame } from '../assets';
import THEME from '../constants/theme';

export type BgVariant = 'loader' | 'menu' | 'game' | 'result' | 'shelf';

type Blob = {
  size: number;
  color: string;
  opacity: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

const BLOBS: Record<BgVariant, Blob[]> = {
  loader: [
    { size: 260, color: '#FF69B4', opacity: 0.18, top: -40, left: -60 },
    { size: 300, color: '#9B59B6', opacity: 0.15, bottom: -70, right: -60 },
    { size: 180, color: '#FFD1E8', opacity: 0.1, top: 300, right: -50 },
  ],
  menu: [
    { size: 300, color: '#FF69B4', opacity: 0.12, top: -70, right: -80 },
    { size: 240, color: '#9B59B6', opacity: 0.09, bottom: -60, left: -70 },
  ],
  game: [
    { size: 240, color: '#FF69B4', opacity: 0.1, top: -60, right: -70 },
    { size: 200, color: '#9B59B6', opacity: 0.07, bottom: -50, left: -60 },
  ],
  result: [
    { size: 280, color: '#FFD166', opacity: 0.14, top: -60, left: -70 },
    { size: 240, color: '#FFB3D9', opacity: 0.16, bottom: -50, right: -60 },
  ],
  shelf: [
    { size: 260, color: '#FF69B4', opacity: 0.1, top: -70, left: -70 },
    { size: 220, color: '#9B59B6', opacity: 0.08, bottom: -60, right: -60 },
  ],
};

const OVERLAYS: Record<BgVariant, string[]> = {
  loader: THEME.gradients.loaderOverlay,
  menu: THEME.gradients.menuOverlay,
  game: THEME.gradients.gameOverlay,
  result: THEME.gradients.resultOverlay,
  shelf: THEME.gradients.shelfOverlay,
};

/** Deterministic sugar grains — no RNG in render. */
const GRAINS = [
  { top: 90, left: 44, size: 4 },
  { top: 140, left: 268, size: 3 },
  { top: 210, left: 120, size: 3 },
  { top: 268, left: 320, size: 4 },
  { top: 332, left: 60, size: 3 },
  { top: 402, left: 210, size: 4 },
  { top: 470, left: 96, size: 3 },
  { top: 520, left: 300, size: 3 },
  { top: 575, left: 160, size: 4 },
  { top: 628, left: 36, size: 3 },
  { top: 672, left: 250, size: 3 },
  { top: 710, left: 130, size: 4 },
  { top: 180, left: 196, size: 3 },
  { top: 440, left: 330, size: 3 },
];

export function ScreenBackground({
  variant,
  children,
}: {
  variant: BgVariant;
  children: React.ReactNode;
}) {
  const blobs = BLOBS[variant];
  const showGrains = variant === 'loader';

  return (
    <ImageBackground source={bgGame} style={styles.bg} resizeMode="cover">
      <LinearGradient
        colors={OVERLAYS[variant]}
        start={variant === 'loader' ? { x: 0, y: 0 } : { x: 0.5, y: 0 }}
        end={variant === 'loader' ? { x: 1, y: 1 } : { x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {blobs.map((b, i) => (
          <View
            key={`blob-${variant}-${i}`}
            style={{
              position: 'absolute',
              width: b.size,
              height: b.size,
              borderRadius: b.size / 2,
              backgroundColor: b.color,
              opacity: b.opacity,
              top: b.top,
              left: b.left,
              right: b.right,
              bottom: b.bottom,
            }}
          />
        ))}
        {showGrains
          ? GRAINS.map((g, i) => (
              <View
                key={`grain-${i}`}
                style={{
                  position: 'absolute',
                  top: g.top,
                  left: g.left,
                  width: g.size,
                  height: g.size,
                  borderRadius: g.size / 2,
                  backgroundColor: '#FFFFFF',
                  opacity: 0.25,
                }}
              />
            ))
          : null}
      </View>

      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: THEME.colors.bg.primary },
  content: { flex: 1 },
});

export default ScreenBackground;
