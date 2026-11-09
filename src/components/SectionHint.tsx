import React from 'react';
import { StyleSheet, Text } from 'react-native';
import THEME from '../constants/theme';

/** The 11px uppercase helper line. Always rendered ABOVE a CTA, never under it. */
export function SectionHint({ text, tone = 'dark' }: { text: string; tone?: 'dark' | 'light' }) {
  return (
    <Text
      style={[
        styles.hint,
        { color: tone === 'light' ? 'rgba(255,255,255,0.82)' : THEME.colors.text.secondary },
      ]}
      numberOfLines={1}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textAlign: 'center',
  },
});

export default SectionHint;
