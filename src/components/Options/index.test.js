import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Options from '.';

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

test('renders options view', () => {
  const store = mockStore(initialState);
  render(<Provider store={store}>
    <Options />
  </Provider>);
  const optionsTitle = screen.getByText(/options/i);
  expect(optionsTitle).toBeInTheDocument();
});

test('options button will be disabled without inputs', () => {
  const store = mockStore(initialState);
  render(<Provider store={store}>
    <Options />
  </Provider>);

  const button = screen.getByRole('button');

  expect(button).not.toBeDisabled();

  const rowsInput = screen.getByLabelText('rows');
  fireEvent.change(rowsInput, { target: { value: '' } });

  const columnsInput = screen.getByLabelText('columns');
  fireEvent.change(columnsInput, { target: { value: '' } });

  const bombsInput = screen.getByLabelText('bombs');
  fireEvent.change(bombsInput, { target: { value: '' } });

  expect(button).toBeDisabled();
});
