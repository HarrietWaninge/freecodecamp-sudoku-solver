class SudokuSolver {
  constructor() {
    this.numberOfColums = 9;
    this.numberOfRows = 9;
    this.numberOfCharacters = this.numberOfColums * this.numberOfRows;
  }

  validate(puzzleString) {
    let regEx = /[^1-9\.]/;
    let isInvalid =
      puzzleString.length != this.numberOfCharacters
        ? true
        : regEx.test(puzzleString)
        ? true
        : false;

    return isInvalid ? "NO!" : "";
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let targetRow = this.getTargetRow(puzzleString, row);
    let isPresent = targetRow.includes(value);
    return !isPresent;
  }
  getTargetRow(puzzleString, row) {
    const rowLetters = "abcdefghijklmnopqrstuvwxyz";
    let regex = new RegExp(`${row}`, "i");
    let numberEnd = this.numberOfRows * (rowLetters.match(regex).index + 1);
    let numberStart = numberEnd - this.numberOfRows;
    let targetRow = puzzleString.substring(numberStart, numberEnd);
    return targetRow;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let targetColumn = this.getTargetColumn(puzzleString, column);
    let isPresent = targetColumn.includes(value);
    return !isPresent;
  }

  getTargetColumn(puzzleString, column) {
    let targetColumn = "";
    for (let i = 0; i < this.numberOfCharacters; i++) {
      if (i % 9 == column - 1) {
        targetColumn = targetColumn + puzzleString[i];
      }
    }
    return targetColumn;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let targetRegion = getTargetRegion();
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
