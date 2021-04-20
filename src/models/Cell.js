const UNCOVER_CELL = {
  TRUE: 0x10,
  FALSE: 0x20,
};

const MARK_CELL = {
  NONE: 0x1,
  FLAG: 0x2,
  DOUBTFUL: 0x4,

  ANY: 0x7,
};

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

module.exports = {
  Cell,
  UNCOVER_CELL,
  MARK_CELL,
};
