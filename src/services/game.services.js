const { Game, GameStorage } = require("../models");
const { GAME_STATUS, MIN_COLUMNS, MIN_ROWS, MARK_CELL } = require("../configs");

const {
  initializingGrid,
  uncoverCell,
  loadMines,
} = require("./utils");

const gameStorage = new GameStorage()

// create and initialize game
const createGame = (req, res) => {
  const { rows, columns } = req.params;

  if (rows < MIN_ROWS || columns < MIN_COLUMNS) {
    
    res.status(400).json({
      error: `Minimun allowed Rows: ${MIN_ROWS}, Columns: ${MIN_COLUMNS}`,
    });

    return;
  }

  const newGrid = initializingGrid(parseInt(rows), parseInt(columns));
  const newGame = new Game(newGrid);

  gameStorage.addGame(newGame);
  
  res.json({
    id: newGame.gameId,
    status: newGame.gameStatus,
    rows: newGrid.totalRows,
    columns: newGrid.totalColumns,
    mines: newGrid.totalMines,
  });
};

// uncover cell and check win o lose game
// if game finished, free slot of storage(GAMES)
const cellClick = (req, res) => {
  const { row, col, gameId } = req.params;
  let freeSlot = false;

  const actualGame = gameStorage.findGameById(gameId);

  if (!actualGame)
    return res.json({ found: false, rows: 0, colums: 0, table: [] });
  
  const grid = actualGame.gameGrid;

  if (grid.areAllCover) loadMines(grid, row, col);

  if (grid.cells[row][col].hasMine) {
    actualGame.gameStatus = GAME_STATUS.OVER;
    freeSlot = true;
  }

  uncoverCell(grid, parseInt(row), parseInt(col));

  if (grid.missingUncover === grid.totalMines) {
    actualGame.gameStatus = GAME_STATUS.WIN;
    freeSlot = true;
  }

  res.json({
    rows: grid.totalRows,
    columns: grid.totalColumns,
    table: grid.advance,
    id: gameId,
    status: actualGame.gameStatus,
    mines: grid.totalMines,
  });

  if (freeSlot) gameStorage.removeGame(gameId)
};

// update mark cover cell, without mark, flag, doubtful
const cellRightClick = (req, res) => {
  const { row, col, gameId } = req.params;

  //const actualGame = findGameById(gameId);
  const actualGame = gameStorage.findGameById(gameId);

  if (!actualGame) {
    return res.json({ found: false, rows: 0, colums: 0, table: [] });
  }

  const cell = actualGame.grid.cells[row][col];
  const cellStatus = cell.actualStatus;

  const cellMark = cellStatus & MARK_CELL.ANY;

  switch (cellMark) {
    case MARK_CELL.NONE:
      cell.updateStatus &= ~MARK_CELL.NONE;
      cell.updateStatus |= MARK_CELL.FLAG;
      break;
    case MARK_CELL.FLAG:
      cell.updateStatus &= ~MARK_CELL.FLAG;
      cell.updateStatus |= MARK_CELL.DOUBTFUL;
      break;
    case MARK_CELL.DOUBTFUL:
      cell.updateStatus &= ~MARK_CELL.DOUBTFUL;
      cell.updateStatus |= MARK_CELL.NONE;
      break;
    default:
      break;
  }

  res.json({ success: "ok" });
};

// load exist Game by id and return Game advance
const loadGame = (req, res) => {
  const { gameId } = req.params;

  const actualGame = gameStorage.findGameById(gameId);

  if (!actualGame)
    return res.json({ found: false, rows: 0, colums: 0, table: [] });

  const grid = actualGame.gameGrid;

  res.json({
    found: true,
    id: gameId,
    rows: grid.totalRows,
    columns: grid.totalColumns,
    table: grid.advance,
    mines: grid.totalMines,
  });
};

const allGameIds = (req,res) => {
  gameStorage.showAllGames()
  res.json({message: 'success'})
}

module.exports = {
  createGame,
  cellClick,
  cellRightClick,
  loadGame,
  allGameIds
};
