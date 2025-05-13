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
    let targetRow = this.getTargetRow(puzzleString, row);
    let isPresent = targetRow.includes(value);
    return !isPresent;
  }
  getTargetRow(puzzleString, row) {
    const rowLetters = "abcdefghijklmnopqrstuvwxyz";
    let regex = new RegExp(`${row}`, "i");
    let numberEnd = this.numberOfColsRows * (rowLetters.match(regex).index + 1);
    let numberStart = numberEnd - this.numberOfColsRows;
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
    let numberOfRegions = this.numberOfCharacters / this.numberOfColsRows;
    /** find out in which region the value should be placed */

    /** I want to get a string of 9 characters from the region */
    let targetRegion = this.getTargetRegion(puzzleString, row, column);
    return true;
  }

  getTargetRegion(puzzleString, row, column) {
    let rowRegionNumber = this.getRowRegionNumber(row);
    let columnRegionNumber = this.getColumnRegionNumber(column);

    let string = "";

    for (let i = 0; i < this.numberOfCharacters; i++) {
      console.log("i", i);
      //regionNumber
      // i want to put it in to arrays. so I can put
      if(i)
    }

    return "";
  }

  getRowRegionNumber(row) {
    const rowLetters = "abcdefghijklmnopqrstuvwxyz";
    let indexOfRow = rowLetters.indexOf(row.toLowerCase());
    let rowRegionNumber = Math.floor(indexOfRow / 3) + 1;
    return rowRegionNumber;
  }
  getColumnRegionNumber(column) {
    return Math.floor(column / 3) + 1;
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
