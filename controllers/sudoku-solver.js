class SudokuSolver {
  constructor() {
    this.numberOfColsRows = 9;
    this.numberOfCharacters = this.numberOfColsRows * this.numberOfColsRows;
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
    let targetRow = this.getRowString(puzzleString, row);
    let isPresent = targetRow.includes(value);
    return !isPresent;
  }
  getRowString(puzzleString, row) {
    const rowLetters = "abcdefghijklmnopqrstuvwxyz";
    let regex = new RegExp(`${row}`, "i");
    let numberEnd = this.numberOfColsRows * (rowLetters.match(regex).index + 1);
    let numberStart = numberEnd - this.numberOfColsRows;
    let targetRow = puzzleString.substring(numberStart, numberEnd);
    return targetRow;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let targetColumn = this.getColumnString(puzzleString, column);
    let isPresent = targetColumn.includes(value);
    return !isPresent;
  }

  getColumnString(puzzleString, column) {
    let targetColumn = "";
    for (let i = 0; i < this.numberOfCharacters; i++) {
      if (i % 9 == column - 1) {
        targetColumn = targetColumn + puzzleString[i];
      }
    }
    return targetColumn;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regionString = this.getRegionString(puzzleString, row, column);
    let isPresent = regionString.includes(value);

    return !isPresent;
  }

  getRegionString(puzzleString, row, column) {
    let rowRegionIndex = this.getRowRegionIndex(row);
    let columnRegionIndex = this.getColumnRegionIndex(column);
    let regionString = "";

    for (let i = 0; i < this.numberOfCharacters; i++) {
      if (
        i % 9 == columnRegionIndex * 3 && //don't make me think about this again please
        i >= (this.numberOfCharacters / 3) * rowRegionIndex &&
        i < (this.numberOfCharacters / 3) * (rowRegionIndex + 1)
      ) {
        for (let j = 0; j < 3; j++) {
          // put the three characters at and after index i in the string
          regionString = regionString + puzzleString[i + j];
        }
      }
    }
    return regionString;
  }

  getRowRegionIndex(row) {
    const rowLetters = "abcdefghijklmnopqrstuvwxyz";
    let rowIndex = rowLetters.indexOf(row.toLowerCase());
    let rowRegionIndex = Math.floor(rowIndex / 3);
    return rowRegionIndex;
  }
  getColumnRegionIndex(column) {
    return Math.floor((column - 1) / 3);
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
