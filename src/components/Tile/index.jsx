import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { revealBombs, setAllowedFlags, setBoard, setClicks, setGameOver, toggleTileFlag } from '../../actions';
import { updateBoard } from '../../utils';
import classnames from 'classnames';

const Tile = (props) => {
  const { tile, restart } = props;
  const board = useSelector(state => state.board);
  const allowedFlags = useSelector(state => state.allowedFlags);
  const rows = useSelector(state => state.rows);
  const columns = useSelector(state => state.columns);
  const gameOver = useSelector(state => state.gameOver);
  const clicks = useSelector(state => state.clicks);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setClicks(clicks + 1));

    const shouldRestart = clicks === 0 && tile.isBomb;

    if (gameOver){
      return false;
    }

    if (shouldRestart) {
      dispatch(setBoard(updateBoard(board, tile, rows, columns, shouldRestart, restart)));
      return false;
    }

    if (tile.isBomb) {
      dispatch(revealBombs());
      dispatch(setGameOver(true));
    } else {
      dispatch(setBoard(updateBoard(board, tile, rows, columns, false, null)));
    }
  };

  const onContextMenu = ev => {
    ev.preventDefault();

    if (gameOver){
      return false;
    }

    const flag = !tile.hasFlag;
    const counter = flag ? allowedFlags - 1 : allowedFlags + 1;

    if (counter >= 0) {
      dispatch(setAllowedFlags(counter));
      dispatch(toggleTileFlag({ tile, flag }));
    }
  };

  const classes = classnames('tile', {
    'show': tile.show,
    'with-flag': tile.hasFlag,
    'with-bomb': tile.isBomb,
  });

  return (
    <button disabled={tile.show || gameOver} className={classes} onClick={onClick} onContextMenu={onContextMenu}>
      {tile.show && tile.isBomb && <span>b</span>}
      {tile.show && !!tile.number && !tile.isBomb && <span>{tile.number}</span>}
    </button>
  );
};

export default Tile;
