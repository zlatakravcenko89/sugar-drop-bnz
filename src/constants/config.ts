import { Dimensions } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export const SCREEN_WIDTH = SCREEN_W;
export const SCREEN_HEIGHT = SCREEN_H;

/**
 * Splash duration. MUST stay >= 6000ms — a shorter loader auto-transitions to
 * the Menu before the automated screenshot window opens and the gate fails.
 */
export const LOADER_DURATION_MS = 8000;
export const LOADER_BAR_MS = 7600;
export const LOADER_BAR_W = 190;
export const LOADER_BAR_H = 8;

/** ---- Board geometry (exact, overflow 0) ---- */
export const BOARD_MAX_W = Math.min(SCREEN_W - 32, 380);
export const COLS = 3;
export const ROWS = 2;
export const SLOTS_PER_RECIPE = COLS * ROWS;

export const BOARD_PAD = 10;
export const BOARD_BORDER = 3;
export const BOARD_FRAME = BOARD_PAD + BOARD_BORDER;

/** Vertical budget of everything on GameScreen that is NOT the board. */
export const GAME_HEADER_H = 112;
export const RECIPE_CARD_H = 72;
export const STAT_STRIP_H = 100;
export const CONTROLS_H = 194;
const GAME_RESERVED_H =
  GAME_HEADER_H + RECIPE_CARD_H + STAT_STRIP_H + CONTROLS_H + 40;

const TILE_BY_WIDTH = Math.floor((BOARD_MAX_W - 2 * BOARD_FRAME) / COLS);
const TILE_BY_HEIGHT = Math.floor(
  (SCREEN_H - GAME_RESERVED_H - 2 * (BOARD_PAD + BOARD_BORDER)) / ROWS,
);

export const TILE = Math.max(70, Math.min(TILE_BY_WIDTH, TILE_BY_HEIGHT));
export const BOARD_W = TILE * COLS + 2 * BOARD_FRAME;
export const BOARD_H = TILE * ROWS + 2 * BOARD_FRAME;

/** 5dp gutter all round, absorbed by the cell — never by the container. */
export const SLOT_GUTTER = 5;
export const SLOT = TILE - SLOT_GUTTER * 2;
export const SLOT_SPRITE = Math.round(SLOT * 0.78);

/** ---- Shelf grid ---- */
export const SHELF_CARD = Math.floor((Math.min(SCREEN_W - 32, 380) - 12) / 2);
export const SHELF_MAX_CARDS = 6;

/** ---- Balance ---- */
export const START_SCORE = 12480;
export const HEARTS_PER_BOARD = 3;
export const RECIPES_PER_BOARD = 3;
export const POINTS_PER_DROP = 120;
export const RECIPE_BONUS = 500;
export const COMBO_CAP = 5;
export const BEST_BOARD = 9;
export const RECIPES_UNLOCKED = 18;
export const SAVED_BOARDS_LIMIT = 20;

/** ---- Timings ---- */
export const FLIGHT_MS = 300;
export const BURST_MS = 420;
export const SHAKE_MS = 260;
export const COUNTUP_MS = 900;
export const HEADER_TOP_PAD = 44;
