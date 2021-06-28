const {GAME_STATUS} = require('../configs')

class Game {
  //constructor(grid, id) {
  constructor(grid) {
    // this.id = id;
    this.id = new Date().valueOf();
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

module.exports = Game;
