const { MARK_CELL } = require("./Cell");

class Grid {
  constructor(rows, columns, cells) {
    this.rows = rows;
    this.columns = columns;
    this.status = MARK_CELL.NONE;
    this.mines = 0;
    this.cells = cells;
  }

  get totalRows() {
    return this.rows;
  }

  get totalColumns() {
    return this.columns;
  }

  get totalCells() {
    return this.rows + this.columns;
  }

  get totalMines() {
    return this.mines;
  }

  set totalMines(a) {
    this.mines = a;
  }

  get areAllCover() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.cells[i][j].isVisible) return false;
      }
    }
    return true;
  }

  get advance() {
    const res = [];

    for (let i = 0; i < this.rows; i++) {
      res.push([]);
      for (let j = 0; j < this.columns; j++) {
        if (this.cells[i][j].isVisible)
          res[i].push(this.cells[i][j].aroundMines);
        else res[i].push(`?-${this.cells[i][j].status}`);
      }
    }

    return res;
  }

  get missingUncover() {
    let count = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (!this.cells[i][j].isVisible) count++;
      }
    }
    return count;
  }
}

module.exports = Grid;
