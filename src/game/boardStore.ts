import { SAVED_BOARDS_LIMIT } from '../constants/config';

export type SavedBoard = {
  id: string;
  recipeName: string;
  slots: Array<number | null>;
  score: number;
};

/**
 * Session-local saved-board store. Swapping in a real storage driver later is a
 * one-file change (no native dependency is allowed in this build).
 */
let boards: SavedBoard[] = [];
let seq = 0;

export function saveBoard(board: Omit<SavedBoard, 'id'>): SavedBoard {
  seq += 1;
  const entry: SavedBoard = { ...board, id: `board-${seq}` };
  boards = [entry, ...boards].slice(0, SAVED_BOARDS_LIMIT);
  return entry;
}

export function getBoards(): SavedBoard[] {
  return boards;
}

export function getBoardCount(): number {
  return boards.length;
}

export function clearBoards(): void {
  boards = [];
}
