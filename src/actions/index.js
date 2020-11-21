import { getGameData } from "../utils";

export const setOptions = (payload) => ({
  type: 'SET_OPTIONS',
  payload,
});

export const setClicks = (payload) => ({
  type: 'SET_CLICKS',
  payload,
});

export const setBoard = (board) => ({
  type: 'SET_BOARD',
  payload: board,
});

export const toggleTileFlag = (payload) => ({
  type: 'TOGGLE_TILE_FLAG',
  payload,
});

export const setAllowedFlags = (payload) => ({
  type: 'SET_ALLOWED_FLAGS',
  payload,
});

export const setBombsPositions = (payload) => ({
  type: 'SET_BOMBS_POSITIONS',
  payload,
});

export const revealBombs = () => ({
  type: 'REVEAL_BOMBS',
});

export const setGameOver = (payload) => ({
  type: 'SET_GAME_OVER',
  payload,
});

export const startGame = (restartClick = true) => (dispatch, getState) => {
  const state = getState();
  const { rows, columns, bombs } = state;
  const { board, bombsPositions } = getGameData(rows, columns, bombs);
  dispatch(setGameOver(false));
  if (restartClick) {
    dispatch(setClicks(0));
  }
  dispatch(setBoard(board));
  dispatch(setBombsPositions(bombsPositions));

  return { rows, columns, bombs, board, bombsPositions };
};