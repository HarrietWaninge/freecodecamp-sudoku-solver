const chai = require("chai");
const assert = chai.assert;
const {
  puzzlesAndSolutions,
  invalidPuzzles,
  shortPuzzles,
} = require("../controllers/puzzle-strings.js");
const { createRandomString } = require("./helpers/test-utils.js");
const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  suite("string validation", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
      assert.deepEqual(solver.validate(puzzlesAndSolutions[0][0]), {
        error: null,
      });
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      assert.deepEqual(solver.validate(createRandomString(81, false)), {
        error: "Invalid characters in puzzle",
      });
    });
    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      assert.deepEqual(solver.validate(shortPuzzles[0]), {
        error: "Expected puzzle to be 81 characters long",
      });
      assert.deepEqual(solver.validate(shortPuzzles[1]), {
        error: "Expected puzzle to be 81 characters long",
      });
    });
  });
  suite("Placement Validation", () => {
    test("Logic handles a valid row placement", () => {
      assert.equal(
        solver.checkRowPlacement(puzzlesAndSolutions[0][0], "A", 2, 3),
        true
      );
    });
    test("Logic handles an invalid row placement", () => {
      assert.equal(
        solver.checkRowPlacement(puzzlesAndSolutions[0][0], "B", 1, 6),
        false
      );
    });
    test("Logic handles a valid column placement", () => {
      assert.equal(
        solver.checkColPlacement(puzzlesAndSolutions[0][0], "B", 1, 5),
        true
      );
    });
    test("Logic handles an invalid column placement", () => {
      assert.equal(
        solver.checkColPlacement(puzzlesAndSolutions[0][0], "B", 1, 1),
        false
      );
    });
    test("Logic handles a valid region (3x3 grid) placement", () => {
      assert.equal(
        solver.checkRegionPlacement(puzzlesAndSolutions[0][0], "D", 5, 4),
        true
      );
    });
    test("Logic handles an invalid region (3x3 grid) placement", () => {
      assert.equal(
        solver.checkRegionPlacement(puzzlesAndSolutions[0][0], "D", 7, 4),
        false
      );
    });
  });
  suite("Solving-logic", () => {
    test("valid puzzle strings pass the solver", () => {
      for (let i = 0; i < puzzlesAndSolutions.length; i++) {
        //  console.log("Valid Puzzle");
        assert.deepEqual(solver.solve(puzzlesAndSolutions[i][0]), {
          solution: puzzlesAndSolutions[i][1],
        });
      }
    });
    test("Invalid puzzle strings fail the solver", () => {
      for (let i = 0; i < puzzlesAndSolutions.length; i++) {
        //  console.log("invalid puzzle");
        assert.deepEqual(solver.solve(invalidPuzzles[i]), {
          error: "Puzzle cannot be solved",
        });
      }
    });
    test("Solver returns the expected solution for an incomplete puzzle", () => {
      //I honestly don't know what I should have tested with the "valid puzzle strings pass the solver" test.
      for (let i = 0; i < puzzlesAndSolutions.length; i++) {
        //  console.log("Valid Puzzle");
        assert.deepEqual(solver.solve(puzzlesAndSolutions[i][0]), {
          solution: puzzlesAndSolutions[i][1],
        });
      }
    });
  });
});
