class SudokuSolver {
  constructor() {
    this.numberOfColsRows = 9;
    this.numberOfCharacters = this.numberOfColsRows * this.numberOfColsRows;
  }

  validateCharacters(puzzleString) {
    let regEx = /[^1-9\.]/;
    let isWrongLength, hasInvalidChar, hasMistakes;

    hasInvalidChar = regEx.test(puzzleString);

    switch (key) {
      case value:
        break;

      default:
        break;
    }
    if (hasInvalidChar) {
      return { error: "Invalid characters in puzzle" };
    }
    isWrongLength = puzzleString.length != this.numberOfCharacters;

    if (isWrongLength) {
      return { error: "Expected puzzle to be 81 characters long" };
    }
    hasMistakes = this.checkValidity(puzzleString);
    if (hasMistakes) {
      return { error: "Puzzle cannot be solved" };
    }

    return true;
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
        i % 9 == columnRegionIndex * 3 &&
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
    let changedPuzzleString;
    let puzzleArray = puzzleString.split("");
    let repeat = true;
    let solved;
    if (this.checkValidity(puzzleString)) {
    }

    while (repeat) {
      for (let i = 0; i < puzzleString.length; i++) {
        let repeat = false;
        if (puzzleArray[i] === ".") {
          //if the character is a dot, get all the possible numbers for this spot
          let options = this.getOptions(puzzleArray, i);
          if (options.length === 1) {
            //if there is only 1 option, put it in place
            repeat = true;
            puzzleArray[i] = options[0];
            changedPuzzleString = puzzleArray.join("");
          }
        }
      }
      //check if there where any changes from the last itteration, if not, puzzle is solved or unsolvable
      if (changedPuzzleString === puzzleString) {
        repeat = false;
      }
      puzzleString = changedPuzzleString;
    }
    // console.log(puzzleString);
    solved = !puzzleString.includes(".");

    return solved ? puzzleString : { message: "puzzle isn't solvable" };
  }

  checkValidity(puzzleString) {
    //checkFor Duplicate numbers
    let puzzle = this.getPuzzleGrid(puzzleString);
    let valid = true;

    //check every number on corectness
    for (let i = 0; i < puzzleString.length; i++) {
      if (puzzleString[i] !== ".") {
        let { row, col } = this.getCoordinates(i);
        let parameters = [puzzleString, row, col, i];
        if (this.checkOnePlace(parameters)) {
          //and set valid to false if a number isn't placed corectly
          valid = false;
        }
      }
    }
    return valid;
  }

  getPuzzleGrid(puzzleString) {
    //console.log("puzzleString", puzzleString);
    let grid = [];

    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        row.push(puzzleString[i * 9 + j]);
      }
      grid.push(row);
    }
    return grid;
  }
  checkForDuplicates(numberArray) {
    console.log("array to check: ", numberArray);
    //checks if there are any duplicates in this array
    return new Set(numberArray).size !== numberArray.length;
  }

  getOptions(puzzleArray, index) {
    let coordinates = this.getCoordinates(index);
    let indexData = { index, ...coordinates, options: [] };

    for (let i = 1; i < 10; i++) {
      //check numbers 1-9 to see if it is an option on this location
      let parameters = [
        puzzleArray.join(""),
        coordinates.row,
        coordinates.col,
        i,
      ];
      if (this.checkOnePlace(parameters)) {
        // if it is an option, put it as an option in the indexData
        indexData.options.push(i);
      }
    }

    // console.log(indexData);
    return indexData.options;
  }

  getCoordinates(index) {
    //get row letter
    let alphabet = "abcdefghi";
    let rowIndex = Math.floor(index / 9);
    let row = alphabet[rowIndex];

    //get column number
    let columnIndex = index % 9;

    return { row: row, col: columnIndex + 1 };
  }

  checkOnePlace(parameterArray) {
    return (
      this.checkColPlacement(...parameterArray) &&
      this.checkRowPlacement(...parameterArray) &&
      this.checkRegionPlacement(...parameterArray)
    );
  }
}

module.exports = SudokuSolver;
