import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../../actions';
import {  getIterableBoard } from '../../utils';
import Tile from '../Tile';

export default function Board() {
  const board = useSelector(state => state.board);
  const rows = useSelector(state => state.rows);
  const columns = useSelector(state => state.columns);
  const bombs = useSelector(state => state.bombs);
  const clicks = useSelector(state => state.clicks);
  const canCreateBoard = Boolean(rows && columns && bombs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (canCreateBoard) {
      dispatch(startGame());
    }
  }, [dispatch, canCreateBoard]);

  if (!board) {
    return null;
  }

  const iterableBoard = getIterableBoard(board);

  return (
    <div className='board'>
      <header>
        <div className='title'>
          <h1>minesweeper</h1>
          <button role='emoji' className='restart' onClick={() => dispatch(startGame())}>😊</button>
        </div>
        <div>
          <span>c: {clicks}</span>
          <span>b: {bombs}</span>
        </div>
      </header>
      <div>
        {iterableBoard.map((row, index) => <div key={`row_${index}`} className='row'>
          {row.map(tile => <Tile key={tile.position} tile={tile} restart={() => dispatch(startGame(false))} />)}
        </div>)}
      </div>
    </div>
  );
}
