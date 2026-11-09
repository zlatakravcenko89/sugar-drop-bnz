import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { candySprite } from '../assets';
import { RECIPE_CARD_H, SLOTS_PER_RECIPE } from '../constants/config';
import { recipeCounts, type Recipe } from '../game/recipes';
import THEME from '../constants/theme';

/** Recipe headline + the required-candy strip (top 3 candies by count). */
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const counts = recipeCounts(recipe);
  const strip = Object.keys(counts)
    .map(key => ({ id: Number(key), count: counts[Number(key)] }))
    .filter(entry => entry.count > 0)
    .sort((a, b) => b.count - a.count || a.id - b.id)
    .slice(0, 3);

  return (
    <View style={[styles.card, THEME.shadows.clay]}>
      <View pointerEvents="none" style={styles.topLight} />
      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={1}>
          {recipe.name}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {`FILL ${SLOTS_PER_RECIPE} SLOTS`}
        </Text>
      </View>
      <View style={styles.strip}>
        {strip.map(entry => (
          <View key={`need-${entry.id}`} style={styles.needItem}>
            <Image
              source={candySprite(entry.id)}
              style={styles.needSprite}
              resizeMode="contain"
            />
            <View style={styles.countPill}>
              <Text style={styles.countText} numberOfLines={1}>
                {`x${entry.count}`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: RECIPE_CARD_H,
    backgroundColor: THEME.colors.bg.secondary,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: THEME.colors.ui.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  topLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 24,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  left: { flex: 1, justifyContent: 'center' },
  name: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
    letterSpacing: 0.6,
    color: THEME.colors.text.primary,
  },
  sub: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 13,
    color: THEME.colors.text.secondary,
  },
  strip: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  needItem: { alignItems: 'center', justifyContent: 'center' },
  needSprite: { width: 32, height: 32 },
  countPill: {
    marginTop: 2,
    minWidth: 24,
    height: 16,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: THEME.colors.bg.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 13,
    color: THEME.colors.candy.purple,
    fontVariant: ['tabular-nums'],
  },
});

export default RecipeCard;
