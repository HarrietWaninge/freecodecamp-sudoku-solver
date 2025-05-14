const chai = require("chai");
const assert = chai.assert;
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings.js");

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  function getSample() {
    return puzzlesAndSolutions[
      Math.floor(Math.random() * puzzlesAndSolutions.length)
    ][0];
  }
  function createRandomString(length, valid) {
    let chars;
    let result = "";

    if (valid) {
      chars = ".123456789";
    } else {
      chars = ",#+)(}{][|abcd'";
    }
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // console.log("result:", result);
    return result;
  }
  suite("string validation", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
      assert.equal(solver.validate(createRandomString(81, true)), "");
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      assert.equal(solver.validate(createRandomString(81, false)), "NO!");
    });
    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      assert.equal(solver.validate(createRandomString(80, true)), "NO!");
      assert.equal(solver.validate(createRandomString(80, false)), "NO!");
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
  });
});

/**
 * 
Logic handles a valid region (3x3 grid) placement
Logic handles an invalid region (3x3 grid) placement
Valid puzzle strings pass the solver
Invalid puzzle strings fail the solver
Solver returns the expected solution for an incomplete puzzle */
