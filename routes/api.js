"use strict";

const Solver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new Solver();

  app.route("/api/check").post((req, res) => {
    let result;
    let { puzzle, coordinate, value } = req.body;
    if (!coordinate || !value) {
      res.json({ error: "Required field(s) missing" });
    }
    result = solver.check(puzzle, coordinate[0], coordinate[1], value);
    res.json(result);
  });

  app.route("/api/solve").post((req, res) => {
    let result;
    if (req.body.puzzle) {
      result = solver.solve(req.body.puzzle);
    } else {
      result = { error: "Required field missing" };
    }

    res.json(result);
  });
};
