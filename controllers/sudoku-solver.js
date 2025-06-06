const { invalidPuzzles } = require("./puzzle-strings");

class SudokuSolver {
  constructor() {
    this.numberOfColsRows = 9;
    this.numberOfCharacters = this.numberOfColsRows * this.numberOfColsRows;
    this.rowLetters = "abcdefghi";
  }

  validate(puzzleString) {
    let regEx = /[^1-9\.]/;
    let isWrongLength, hasInvalidChar, hasMistakes;

    hasInvalidChar = regEx.test(puzzleString);

    if (hasInvalidChar) {
      return { error: "Invalid characters in puzzle" };
    }
    isWrongLength = puzzleString.length != this.numberOfCharacters;

    if (isWrongLength) {
      return { error: "Expected puzzle to be 81 characters long" };
    }
    hasMistakes = !this.checkValidity(puzzleString);
    if (hasMistakes) {
      return { error: "Puzzle cannot be solved" };
    }

    return { error: null };
  }

  check(puzzleString, coordinate, value) {
    //check for any input that's not valid and get the error
    let inputErrors = this.checkForErrors(puzzleString, coordinate, value);

    if (inputErrors.error) {
      return inputErrors;
    }

    let result;
    let row = coordinate[0];
    let col = coordinate[1];
    //replace current value with a dot so it won't show up in the comparison
    let newPuzzleString = this.replaceCoordinateValue(
      puzzleString,
      row,
      col,
      "."
    );
    let parameterArray = [newPuzzleString, row, col, value];
    //check the 3 different requirements and store their string if false
    let conflictArray = [
      ...(!this.checkColPlacement(...parameterArray) ? ["column"] : []),
      ...(!this.checkRowPlacement(...parameterArray) ? ["row"] : []),
      ...(!this.checkRegionPlacement(...parameterArray) ? ["region"] : []),
    ];
    //build the result object
    result = {
      valid: conflictArray.length == 0,
      ...(conflictArray.length !== 0 && { conflict: conflictArray }),
    };

    return result;
  }

  replaceCoordinateValue(puzzleString, row, col, newValue) {
    let index = this.getIndexFromCoordinates(row, col);
    let puzzleArray = puzzleString.split("");
    puzzleArray[index] = newValue;
    let newPuzzleString = puzzleArray.join("");
    return newPuzzleString;
  }

  checkForErrors(puzzleString, coordinate, value) {
    let puzzleStringError = this.validate(puzzleString);
    let validCoordinates = this.validateCoordinate(puzzleString, coordinate);
    if (puzzleStringError.error) {
      return puzzleStringError;
    } else if (!validCoordinates) {
      return { error: "Invalid coordinate" };
    } else if (!this.validateSudokuNumber(value)) {
      return { error: "Invalid value" };
    } else return { error: null };
  }
  validateCoordinate(puzzleString, coordinate) {
    let coordinateRegex = /^[a-i][1-9]$/i;

    if (!coordinateRegex.test(coordinate)) {
      return false;
    }
    let row = coordinate[0];
    let col = coordinate[1];
    return (
      this.getRowString(puzzleString, row) !== null &&
      this.getColString(puzzleString, col) !== null
    );
  }

  validateSudokuNumber(value) {
    let regEx = /^[1-9]$/;
    return regEx.test(value);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let targetRow = this.getRowString(puzzleString, row);
    let isPresent = targetRow.includes(value);
    return !isPresent;
  }
  getRowString(puzzleString, row) {
    let rowIndex = this.rowLetters.toLowerCase().indexOf(row.toLowerCase());
    if (rowIndex === -1) {
      return null;
    }
    let numberEnd = this.numberOfColsRows * (rowIndex + 1);
    let numberStart = numberEnd - this.numberOfColsRows;
    let targetRow = puzzleString.substring(numberStart, numberEnd);
    return targetRow;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let targetColumn = this.getColString(puzzleString, column);
    let isPresent = targetColumn.includes(value);

    return !isPresent;
  }

  getColString(puzzleString, column) {
    if (!this.validateSudokuNumber(column)) {
      return null;
    }
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
    let rowIndex = this.rowLetters.indexOf(row.toLowerCase());
    let rowRegionIndex = Math.floor(rowIndex / 3);
    return rowRegionIndex;
  }

  getColumnRegionIndex(column) {
    return Math.floor((column - 1) / 3);
  }

  solve(puzzleString) {
    let changedPuzzleString;
    let puzzleError = this.validate(puzzleString);

    if (puzzleError.error !== null) {
      return puzzleError;
    }

    let solved;
    let repeat = true;

    while (repeat) {
      for (let i = 0; i < puzzleString.length; i++) {
        if (puzzleString[i] === ".") {
          //if the character is a dot, get all the possible numbers for this spot
          let options = this.getOptions(puzzleString, i);
          if (options.length === 1) {
            //if there is only 1 option, put it in place
            let { row, col } = this.getCoordinatesFromIndex(i);
            changedPuzzleString = this.replaceCoordinateValue(
              puzzleString,
              row,
              col,
              options[0]
            );
          }
        }
      }
      //check if there where any changes from the last itteration, if not, puzzle is solved or unsolvable
      if (changedPuzzleString === puzzleString) {
        repeat = false;
      }
      puzzleString = changedPuzzleString;
    }
    //check if there are still dots in the string, to check if the puzzle is solved
    solved = !puzzleString.includes(".");

    return solved
      ? { solution: puzzleString }
      : { error: "Puzzle cannot be solved" };
  }

  checkValidity(puzzleString) {
    //check For Duplicate numbers
    let valid = true;

    //check every number on corectness
    for (let i = 0; i < puzzleString.length; i++) {
      if (puzzleString[i] !== ".") {
        //change the current place in the puzzleString to . for testing
        let puzzleArray = puzzleString.split("");
        puzzleArray[i] = ".";
        let testPuzzleString = puzzleArray.join("");

        let { row, col } = this.getCoordinatesFromIndex(i);
        let parameters = [testPuzzleString, row, col, puzzleString[i]];
        if (!this.checkOnePlace(parameters)) {
          //and set valid to false if a number isn't placed corectly
          return !valid;
        }
      }
    }
    return valid;
  }

  getOptions(puzzleString, index) {
    let coordinates = this.getCoordinatesFromIndex(index);
    let indexData = { index, ...coordinates, options: [] };

    for (let i = 1; i < 10; i++) {
      //check numbers 1-9 to see if it is an option on this location
      let parameters = [puzzleString, coordinates.row, coordinates.col, i];
      if (this.checkOnePlace(parameters)) {
        // if it is an option, put it as an option in the indexData
        indexData.options.push(i);
      }
    }
    return indexData.options;
  }

  getCoordinatesFromIndex(index) {
    //get row letter
    let rowIndex = Math.floor(index / 9);
    let row = this.rowLetters[rowIndex];

    //get column number
    let columnIndex = index % 9;

    return { row: row, col: columnIndex + 1 };
  }

  getIndexFromCoordinates(row, col) {
    let colIndex = col - 1;
    let rowNumber = this.rowLetters.indexOf(row.toLowerCase());
    let index = rowNumber + colIndex + rowNumber * 8;

    return index;
  }

  checkOnePlace(parameterArray) {
    let valid =
      this.checkColPlacement(...parameterArray) &&
      this.checkRowPlacement(...parameterArray) &&
      this.checkRegionPlacement(...parameterArray);

    return valid;
  }
}

module.exports = SudokuSolver;
