const {MARK_CELL} = require('../configs')

class Cell {
  constructor(row, col) {
    this.visible = false;
    this.aroundMines = 0;
    this.status = MARK_CELL.NONE;
    this.row = row;
    this.col = col;
  }

  set isVisible(a) {
    this.visible = a;
  }

  set updateStatus(a) {
    this.status = a;
  }

  set putMine(a) {
    this.aroundMines = a;
  }

  get actualStatus() {
    return this.status;
  }

  get isVisible() {
    return this.visible;
  }

  get hasMine() {
    return this.aroundMines === 9;
  }
}

module.exports = Cell
