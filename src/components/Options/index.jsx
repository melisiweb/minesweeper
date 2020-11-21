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
  const canSubmit = state.rows && state.columns && state.bombs;

  if (rows && columns && bombs) {
    return null;
  };

  const onChange = (ev) => {
    setState((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value ? parseInt(ev.target.value, 10) : 0,
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
        <input type="number" name='rows' placeholder='Rows' onChange={onChange} value={state.rows} />
      </label>
      <label>
        number of columns:
        <input type="number" name='columns' placeholder='Columns' onChange={onChange} value={state.columns} />
      </label>
      <label>
        number of bombs:
        <input type="number" name='bombs' placeholder='Bombs' onChange={onChange} value={state.bombs} />
      </label>
      <button className='options-btn' disabled={!canSubmit} onClick={onClick}>save</button>
    </div>
  );
};
