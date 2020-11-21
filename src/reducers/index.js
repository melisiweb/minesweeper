import { getRowColumnFromPosition } from "../utils";

const initialState = {
  clicks: 0,
  board: null,
  rows: null,
  columns: null,
  bombs: null,
  bombsPositions: null,
  allowedFlags: 0,
  gameOver: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_OPTIONS':
      return { ...state, ...payload };
    case 'SET_CLICKS':
      return { ...state, clicks: payload };
    case 'SET_BOARD':
      return { ...state, board: payload };
    case 'SET_ALLOWED_FLAGS':
      return { ...state, allowedFlags: payload };
    case 'SET_BOMBS_POSITIONS':
      return { ...state, bombsPositions: payload };
    case 'REVEAL_BOMBS': {
      const board = { ...state.board };
      const bombsPoints = state.bombsPositions.map(position => getRowColumnFromPosition(position, state.rows, state.columns));

      bombsPoints.forEach(point => {
        board[point.row][point.column].show = true;
      });

      return { ...state, board };
    }
    case 'SET_GAME_OVER':
      return { ...state, gameOver: payload };
    case 'TOGGLE_TILE_FLAG': {
      const { tile, flag } = payload;

      return {
        ...state,
        board: {
          ...state.board,
          [tile.row]: {
            ...state.board[tile.row],
            [tile.column]: {
              ...state.board[tile.row][tile.column],
              hasFlag: flag
            }
          }
        },
      };
    }

    default:
      return state;
  }
};
