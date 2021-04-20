const GAME_STATUS = {
  ACTIVE: 0x1,
  WIN: 0x2,
  OVER: 0x4,
};

const MIN_ROWS = 6;
const MIN_COLUMNS = 6;

class Game {
  constructor(grid, id) {
    this.id = id;
    this.grid = grid;
    this.status = GAME_STATUS.ACTIVE;
  }

  get gameId() {
    return this.id;
  }

  get gameGrid() {
    return this.grid;
  }

  get gameStatus() {
    return this.status;
  }

  set gameStatus(a) {
    this.status = a;
  }
}

module.exports = {
  Game,
  GAME_STATUS,
  MIN_COLUMNS,
  MIN_ROWS,
};
