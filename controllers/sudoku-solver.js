class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return "NO!";
    }

    return "";
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
