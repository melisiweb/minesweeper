import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllowedFlags, setOptions } from '../../actions';

export default function Options() {
  const rows = useSelector(state => state.rows);
  const columns = useSelector(state => state.columns);
  const bombs = useSelector(state => state.bombs);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    rows: 15,
    columns: 30,
    bombs: 100,
  });
  const bombsLimit = (state.columns * state.rows) - 2;
  const canSubmit = state.rows && state.columns && state.bombs && state.bombs <= bombsLimit;
  const shouldHideOptions = rows && columns && bombs;

  if (shouldHideOptions) {
    return null;
  }

  const onChange = (ev) => {
    const { name, value } = ev.target;
    let newValue = value ? parseInt(value, 10) : 0;

    if (name === 'bombs' && newValue > bombsLimit) {
      newValue = bombsLimit;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const onClick = () => {
    dispatch(setOptions(state));
    dispatch(setAllowedFlags(state.bombs));
  };

  return (
    <div className='options'>
      <header>
        <h1>options</h1>
      </header>
      <label>
        number of rows:
        <input type="number" name='rows' aria-label='rows' placeholder='Rows' onChange={onChange} value={state.rows} />
      </label>
      <label>
        number of columns:
        <input type="number" name='columns' aria-label='columns' placeholder='Columns' onChange={onChange} value={state.columns} />
      </label>
      <label>
        number of bombs:
        <input type="number" max={state.columns * state.rows - 1} name='bombs' aria-label='bombs' placeholder='Bombs' onChange={onChange} value={state.bombs} />
      </label>
      <button role='button' className='options-btn' disabled={!canSubmit} onClick={onClick}>start</button>
    </div>
  );
};
