class SudokuSolver {
  validate(puzzleString) {
    let regEx = /[^1-9\.]/;
    let isInvalid =
      puzzleString.length != 81
        ? true
        : regEx.test(puzzleString)
        ? true
        : false;

    return isInvalid ? "NO!" : "";

    console.log("test", regEx.test(puzzleString));
    console.log("match", puzzleString.match(regEx));
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
