const { Cell, Grid } = require("../models");
const { UNCOVER_CELL } = require("../models/Cell");
const { GAME_STATUS } = require("../models/Game");

// limit of games
const MAX_GAMES = 10;

// number identify mines
const MINE = 9;

// generate a diferent game's id(1 to MAX_GAMES). Return null if has not free slot else game id
const generateGameId = (games) => {
  let newId = parseInt(Math.random() * (MAX_GAMES - 1) + 1);
  let attemps = 0;
  const gameIds = games.map((game) => game.gameId);

  while (gameIds.includes(newId)) {
    newId = parseInt(Math.random() * 10 + 1);
    attemps++;
    if (attemps === MAX_GAMES) return null;
  }

  return newId;
};

// initilize and load mines on grid and return grid ready
const initializingGrid = (rows, columns) => {
  const result = [];

  for (let i = 0; i < rows; i++) {
    result.push([]);
    for (let j = 0; j < columns; j++) {
      const cell = new Cell(i, j);

      result[i].push(cell);
    }
  }

  const grid = new Grid(rows, columns, result);

  return grid;
};

// put mines on grid
const loadMines = (grid, row, col) => {
  const totalMines = Math.ceil(grid.totalCells / 3);
  grid.totalMines = parseInt(totalMines);

  for (let mines = 0; mines < totalMines; mines++) {
    let hasMine = false;
    let randomRowValue;
    let randomColValue;

    while (!hasMine) {
      randomRowValue = parseInt(Math.random() * grid.totalRows);
      randomColValue = parseInt(Math.random() * grid.totalColumns);

      if (
        grid.cells[randomRowValue][randomColValue].hasMine ||
        (randomRowValue == row && randomColValue == col)
      )
        continue;

      grid.cells[randomRowValue][randomColValue].putMine = MINE;
      hasMine = true;
    }

    const rowStart = startAt(randomRowValue);
    const rowEnd = endAt(randomRowValue, grid.totalRows);

    const colStart = startAt(randomColValue);
    const colEnd = endAt(randomColValue, grid.totalColumns);

    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        if (!grid.cells[i][j].hasMine) {
          grid.cells[i][j].aroundMines++;
        }
      }
    }
  }

  let arr = [];
  for (let i = 0; i < grid.totalRows; i++) {
    arr.push([]);
    for (let j = 0; j < grid.totalColumns; j++) {
      arr[i].push(grid.cells[i][j].aroundMines);
    }
  }
};

// use to calculate start iteration
const startAt = (a) => {
  return !a ? a : a - 1;
};

// use to calculate end iteration
const endAt = (a, b) => {
  return a === b - 1 ? a : a + 1;
};

// uncover cell with 0 mines arround
const uncoverCell = (grid, row, col) => {
  const table = grid.cells;

  if (table[row][col].isVisible === false) {
    table[row][col].isVisible = true;
    table[row][col].updateStatus = UNCOVER_CELL.TRUE;

    if (table[row][col].aroundMines === 0) {
      const rowStart = startAt(row);
      const rowEnd = endAt(row, grid.totalRows);
      const colStart = startAt(col);
      const colEnd = endAt(col, grid.totalColumns);

      for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
          if (table[i][j] != MINE) uncoverCell(grid, i, j);
        }
      }
    }
  }
};

// free slot of storage(GAMES)
const freeSlots = (games) => {
  games.forEach((game, index) => {
    if (game.gameStatus & (GAME_STATUS.WIN | GAME_STATUS.OVER))
      games.splice(index, 1);
  });
};

module.exports = {
  generateGameId,
  initializingGrid,
  uncoverCell,
  freeSlots,
  loadMines,
  startAt,
  endAt,
};
