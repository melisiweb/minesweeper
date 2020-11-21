import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Tile from '.';
import { getGameData } from '../../utils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const DEFAULT_ROWS = 6;
const DEFAULT_COlUMNS = 6;
const DEFAULT_BOMBS = 3;

const board = {
  1: {
    1: {
      position: 1,
      row: 1,
      column: 1,
      surroundings: [],
      show: false,
      hasFlag: false,
      number: 0,
      isBomb: false,
    }
  }
};

const initialState = {
  clicks: 0,
  board,
  rows: DEFAULT_ROWS,
  columns: DEFAULT_COlUMNS,
  bombs: DEFAULT_BOMBS,
  bombsPositions: [],
  allowedFlags: 0,
  gameOver: false,
};

test('renders tile view', () => {
  const store = mockStore(initialState);
  const tile = board[1][1];
  render(<Provider store={store}>
    <Tile tile={tile} />
  </Provider>);

  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
});

test('tile is shown', () => {
  const store = mockStore(initialState);
  const tile = board[1][1];
  tile.show = true;
  render(<Provider store={store}>
    <Tile tile={tile} />
  </Provider>);

  const button = screen.getByRole('button');

  expect(button).toHaveClass('show');
});

test('tile is bomb', () => {
  const store = mockStore(initialState);
  const tile = board[1][1];
  tile.show = true;
  tile.isBomb = true;
  render(<Provider store={store}>
    <Tile tile={tile} />
  </Provider>);

  const button = screen.getByRole('button');

  expect(button).toHaveClass('with-bomb');
});
