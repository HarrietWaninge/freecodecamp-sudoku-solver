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
    let rowRegionIndex = this.getRowRegionIndex(row);
    let columnRegionIndex = this.getColumnRegionIndex(column);

    /*stel, rowReI = 0   dan wil ik hebben  
    0,1,2   (8)
    9, 10, 11, (17)
    18, 19, 20  (26)

    stel rowRei = 0, colRe = 1
    3,4,5
    12,13,14
    21,22,13

dus ergens moet ik de 

81 verdelen. en vergelijken met 0, 1, 2

characters ((81) / 3) X (rowRegionIndex)    voor index 0 dat is 

- (81/3)

0 x 27 = 0  + 9 + 9
1x  27 = 27
2x  27 = 81


    
     colRegI = 0

     */

    let string = "";

    for (let i = 0; i < this.numberOfCharacters; i++) {
      console.log("i", i);
      //regionNumber
      // i want to put it in to arrays. so I can
      // if(i)
      // console.log(i % 9);
      if (
        i % 9 == 0 &&
        i >= (this.numberOfCharacters / 3) * rowRegionIndex &&
        i < (this.numberOfCharacters / 3) * (rowRegionIndex + 1)
      ) {
        console.log("remainder i", i);
        for (let j = 0; j < 3; j++) {
          // put the three characters at and after index i in the string
          string = string + puzzleString[i + j];
          console.log(string);
        }
      }
    }
    return "";
  }

  getRowRegionIndex(row) {
    const rowLetters = "abcdefghijklmnopqrstuvwxyz";
    let rowIndex = rowLetters.indexOf(row.toLowerCase());
    let rowRegionIndex = Math.floor(rowIndex / 3);
    return rowRegionIndex;
  }
  getColumnRegionIndex(column) {
    return Math.floor(column / 3);
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
