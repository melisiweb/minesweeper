import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

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

test('renders app view', () => {
  const store = mockStore(initialState);
  render(<Provider store={store}>
    <App />
  </Provider>);
  const optionsTitle = screen.getByText(/options/i);
  expect(optionsTitle).toBeInTheDocument();
});
