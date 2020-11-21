const createBombsPositions = (rows = 6, columns = 6, bombs = 6) => {
  const maxPosition = rows * columns;
  const bombsPositions = [];

  while (bombsPositions.length < bombs) {
    const randomPosition = Math.floor(Math.random() * (maxPosition - 2) + 1);

    if (!bombsPositions.includes(randomPosition)) {
      bombsPositions.push(randomPosition);
    }
  }

  return bombsPositions;
};

const getSurroundingsPositions = (position, rows, columns) => {
  const point = getRowColumnFromPosition(position, rows, columns);
  const surroundingPoints = [
    // Left
    { row: point.row, column: point.column + 1 },
    // Right
    { row: point.row, column: point.column - 1 },
    // Lower
    { row: point.row + 1, column: point.column },
    { row: point.row + 1, column: point.column + 1 },
    { row: point.row + 1, column: point.column - 1 },
    // Upper
    { row: point.row - 1, column: point.column },
    { row: point.row - 1, column: point.column + 1 },
    { row: point.row - 1, column: point.column - 1 },
  ].filter(surPoint => surPoint.row > 0 && surPoint.row <= rows && surPoint.column > 0 && surPoint.column <= columns)
  .map(surPoint => (surPoint.row * columns) - (columns - surPoint.column));

  return surroundingPoints;
};

export const getGameData = (rows = 6, columns = 6, bombs = 6) => {
  const bombsPositions = createBombsPositions(rows, columns, bombs);
  const board = {};
  let position = 1;

  for (let row = 1; row <= rows; row++) {
    board[row] = {};
    for (let column = 1; column <= columns; column++) {
      let number = 0;
      const surroundings = getSurroundingsPositions(position, rows, columns);

      surroundings.forEach(surPosition => {
        if (bombsPositions.includes(surPosition)) {
          number++;
        }
      });

      board[row][column] = {
        position,
        row,
        column,
        surroundings,
        show: false,
        hasFlag: false,
        number,
        isBomb: bombsPositions.includes(position),
      };
      position++;
    }
  }

  return { board, bombsPositions };
};

export const getRowColumnFromPosition = (position, rows = 6, columns = 6) => {
  const row = Math.ceil(position / columns);
  const column = position % columns || columns;

  return { row, column };
};

export const updateBoard = (currentBoard, clickedTile, rows = 6, columns = 6, shouldRestart = true, restartCallback = null) => {
  if (shouldRestart) {
    const { board } = restartCallback();
    const tile = board[clickedTile.row][clickedTile.column];
    const shouldRestartNext = tile.isBomb;

    return updateBoard(board, tile, rows, columns, shouldRestartNext, restartCallback);
  }

  let board = { ...currentBoard };



  if (clickedTile.number > 0) {
    board[clickedTile.row][clickedTile.column].show = true;

    return board;
  }
  else {
    const selectedTile = board[clickedTile.row][clickedTile.column];

    if (!selectedTile.show) {
      selectedTile.show = true;
      selectedTile.surroundings.forEach(pos => {
        const tileRowColumn = getRowColumnFromPosition(pos, rows, columns);
        const tile = board[tileRowColumn.row][tileRowColumn.column];
        return updateBoard(board, tile, rows, columns, false, null);
      });
    }

    return board;
  }
};

export const getIterableBoard = board => {
  return Object.values(board).map(row => Object.values(row));
};