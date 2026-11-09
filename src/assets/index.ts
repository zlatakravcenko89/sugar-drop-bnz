/**
 * Codex asset contract — these are the ONLY image names that exist.
 * Never invent another file name here.
 */

export const bgGame = require('../../assets/bg_game.png');
export const logo = require('../../assets/logo.png');
export const iconHome = require('../../assets/icon_home.png');
export const iconPause = require('../../assets/icon_pause.png');
export const buttonRect = require('../../assets/button_rect.png');
export const buttonRound = require('../../assets/button_round.png');

export const sprite1 = require('../../assets/sprite_1.png');
export const sprite2 = require('../../assets/sprite_2.png');
export const sprite3 = require('../../assets/sprite_3.png');
export const sprite4 = require('../../assets/sprite_4.png');
export const sprite5 = require('../../assets/sprite_5.png');

/** Index 0..4 -> candy sprite. Candy ids in the game are 1..5. */
export const SPRITES = [sprite1, sprite2, sprite3, sprite4, sprite5];

export function candySprite(candyId: number) {
  const idx = Math.max(0, Math.min(SPRITES.length - 1, candyId - 1));
  return SPRITES[idx];
}

export const assets = {
  bgGame,
  logo,
  iconHome,
  iconPause,
  buttonRect,
  buttonRound,
  sprites: SPRITES,
};

export default assets;
