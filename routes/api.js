"use strict";

const Solver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new Solver();

  app.route("/api/check").post((req, res) => {
    try {
      let { puzzle, coordinate, value } = req.body;
      if (!coordinate || !value || !puzzle) {
        return res.json({ error: "Required field(s) missing" });
      }
      res.json(solver.check(puzzle, coordinate, value));
    } catch (error) {
      console.log("ERROR", error);
    }
  });

  app.route("/api/solve").post((req, res) => {
    try {
      if (!req.body.puzzle) {
        return res.json({ error: "Required field missing" });
      }
      res.json(solver.solve(req.body.puzzle));
    } catch (error) {
      console.log("ERROR:", error);
    }
  });
};
