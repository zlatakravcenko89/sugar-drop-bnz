/**
 * CANDY_SWEET — claymorphism design system for SUGAR DROP.
 * Copied from the workspace preset and extended with the brief's overrides.
 */

export const THEME = {
  name: 'CANDY_SWEET',

  colors: {
    bg: {
      primary: '#FFF0F5',
      secondary: '#FFFFFF',
      tertiary: '#F8E8F0',
      accent: '#FFE0EB',
    },
    candy: {
      pink: '#FF69B4',
      pinkLight: '#FF8CC6',
      pinkDeep: '#D94E9B',
      pinkSoft: '#FFB3D9',
      purple: '#9B59B6',
      gold: '#FFD166',
      orange: '#FF9F43',
      caramel: '#D97B4D',
      heart: '#FF4D8D',
      heartDead: '#F0D5E2',
    },
    text: {
      primary: '#4A2545',
      secondary: '#8A6A82',
      onAccent: '#FFFFFF',
      muted: '#B8A9C9',
    },
    ui: {
      border: '#FFD1E8',
      borderSoft: '#FFE0EB',
      shadow: '#E7B9CF',
      glassFill: 'rgba(255,255,255,0.14)',
      glassBorder: 'rgba(255,255,255,0.30)',
      highlight: 'rgba(255,255,255,0.26)',
    },
    loader: {
      dark: '#1A0818',
      grape: '#3F1438',
      grapeLight: '#762868',
      sugar: '#FFD1E8',
    },
  },

  gradients: {
    primary: ['#FF8CC6', '#FF69B4', '#D94E9B'],
    primaryFlat: ['#FF8CC6', '#D94E9B'],
    disabled: ['#F0C8DC', '#E3AFC8'],
    gold: ['#FFD166', '#FF9F43'],
    board: ['#FFFFFF', '#FFF4F8'],
    loaderOverlay: ['rgba(63,20,56,0.94)', 'rgba(118,40,104,0.90)', 'rgba(26,8,24,0.96)'],
    menuOverlay: ['rgba(255,240,245,0.90)', 'rgba(255,224,235,0.84)', 'rgba(248,232,240,0.92)'],
    gameOverlay: ['rgba(255,244,248,0.93)', 'rgba(255,230,241,0.88)', 'rgba(255,240,245,0.94)'],
    resultOverlay: ['rgba(155,89,182,0.88)', 'rgba(255,105,180,0.78)', 'rgba(74,37,69,0.92)'],
    shelfOverlay: ['rgba(248,232,240,0.95)', 'rgba(255,224,235,0.90)'],
    progress: ['#FF69B4', '#FFB3D9', '#9B59B6'],
  },

  typography: {
    hero: { fontSize: 42, fontWeight: '900' as const, letterSpacing: 3 },
    verdict: { fontSize: 34, fontWeight: '900' as const, letterSpacing: 2 },
    title: { fontSize: 24, fontWeight: '800' as const, letterSpacing: 1.2 },
    section: { fontSize: 19, fontWeight: '800' as const, letterSpacing: 1 },
    button: { fontSize: 17, fontWeight: '900' as const, letterSpacing: 1.2, lineHeight: 24 },
    buttonSm: { fontSize: 14, fontWeight: '700' as const, letterSpacing: 0.8, lineHeight: 24 },
    body: { fontSize: 15, fontWeight: '600' as const, letterSpacing: 0.1 },
    stat: { fontSize: 16, fontWeight: '800' as const, letterSpacing: 0.4, lineHeight: 20 },
    caption: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 2 },
  },

  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },

  radius: { chip: 16, btn: 22, card: 24, tile: 30, board: 28, brand: 40, pill: 999 },

  shadows: {
    clay: {
      shadowColor: '#E7B9CF',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
      elevation: 6,
    },
    clayLow: {
      shadowColor: '#E7B9CF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 4,
    },
    clayHigh: {
      shadowColor: '#E7B9CF',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.55,
      shadowRadius: 18,
      elevation: 10,
    },
    candy: {
      shadowColor: '#FF69B4',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.45,
      shadowRadius: 18,
      elevation: 10,
    },
  },

  animation: {
    soft: { tension: 48, friction: 7 },
    press: { tension: 300, friction: 12 },
    lift: { tension: 60, friction: 6 },
    pop: { tension: 120, friction: 8 },
    fade: 320,
    action: 300,
    stagger: 70,
  },
};

export type Theme = typeof THEME;
export default THEME;
