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

  solve(puzzleString) {
    let puzzleArray = puzzleString.split("");
    console.log(puzzleString);

    // while (puzzleString.includes(".")) {
    for (let i = 0; i < puzzleString.length; i++) {
      if (puzzleArray[i] === ".") {
        let options = this.getOptions(puzzleArray, i);
        if (options.length == 1);
        puzzleArray[i] = options[0];
        puzzleString = puzzleArray.join("");
        console.log(puzzleString);
      }
    }
    //   }

    return true;
  }

  getOptions(puzzleArray, index) {
    let coordinates = this.getCoordinates(index);
    let indexData = { index, ...coordinates, options: [] };

    for (let i = 1; i < 10; i++) {
      let parameters = [
        puzzleArray.join(""),
        coordinates.row,
        coordinates.col,
        i,
      ];
      if (
        this.checkColPlacement(...parameters) &&
        this.checkRowPlacement(...parameters) &&
        this.checkRegionPlacement(...parameters)
      ) {
        indexData.options.push(i);
      }
    }

    console.log(indexData);
    return indexData.options;
  }

  getCoordinates(index) {
    //get row letter
    let alphabet = "abcdefghi";
    let rowIndex = Math.floor(index / 9);
    let row = alphabet[rowIndex];
    console.log("index: ", index, "row: ", row);

    //get column number
    let columnIndex = index % 9;

    return { row: row, col: columnIndex + 1 };
  }
}

module.exports = SudokuSolver;
