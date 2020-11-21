import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Board from '.';
import { getGameData } from '../../utils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const DEFAULT_ROWS = 6;
const DEFAULT_COlUMNS = 6;
const DEFAULT_BOMBS = 3;

const { board, bombsPositions } = getGameData(DEFAULT_ROWS, DEFAULT_COlUMNS, DEFAULT_BOMBS);

const initialState = {
  clicks: 0,
  board,
  rows: DEFAULT_ROWS,
  columns: DEFAULT_COlUMNS,
  bombs: DEFAULT_BOMBS,
  bombsPositions,
  allowedFlags: 0,
  gameOver: false,
};

test('renders board view', () => {
  const store = mockStore(initialState);
  render(<Provider store={store}>
    <Board />
  </Provider>);
  const boardTitle = screen.getByText(/minesweeper/i);
  expect(boardTitle).toBeInTheDocument();
});
