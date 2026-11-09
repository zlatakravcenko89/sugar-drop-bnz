import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import THEME from '../constants/theme';
import type { IconComp } from './PrimaryButton';

export const STAT_ICON = 20;
export const STAT_ICON_WRAP = 38;

/**
 * The ONE stat component, shared by GameScreen and ResultScreen.
 * Every pill in a row is identical in width / height / padding / radius and the
 * icon always sits in the same 38x38 circle — only the colour and the value
 * change. The root is width:'100%' (never flex:1) so it can live inside a
 * flex:1 slot without the circular-flex collapse.
 */
export function StatPill({
  Icon,
  value,
  label,
  tint,
  tone = 'light',
}: {
  Icon: IconComp;
  value: string;
  label: string;
  tint: string;
  tone?: 'light' | 'glass';
}) {
  const glass = tone === 'glass';

  return (
    <View
      style={[
        styles.card,
        glass ? styles.glass : styles.light,
        !glass ? THEME.shadows.clayLow : null,
      ]}>
      <View style={[styles.iconWrap, { backgroundColor: tint + '22' }]}>
        <Icon size={STAT_ICON} color={tint} strokeWidth={2.4} />
      </View>
      <Text
        style={[styles.value, { color: glass ? '#FFFFFF' : tint }]}
        numberOfLines={1}>
        {value}
      </Text>
      <Text
        style={[
          styles.label,
          { color: glass ? 'rgba(255,255,255,0.78)' : THEME.colors.text.secondary },
        ]}
        numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    backgroundColor: THEME.colors.bg.secondary,
    borderColor: THEME.colors.ui.borderSoft,
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: 'rgba(255,255,255,0.22)',
  },
  iconWrap: {
    width: STAT_ICON_WRAP,
    height: STAT_ICON_WRAP,
    borderRadius: STAT_ICON_WRAP / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
    letterSpacing: 0.4,
    fontVariant: ['tabular-nums'],
  },
  label: {
    marginTop: 1,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});

export default StatPill;
