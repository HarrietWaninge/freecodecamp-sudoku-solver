class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return "NO!";
    }
    let regEx = /[^1-9]^\./;
    console.log("match", puzzleString.match(regEx));
    if (regEx.test(puzzleString)) {
      return "NO";
    }

    return "";
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
