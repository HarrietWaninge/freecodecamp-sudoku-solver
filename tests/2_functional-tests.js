const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const {
  puzzlesAndSolutions,
  invalidPuzzles,
} = require("../controllers/puzzle-strings");
const { createRandomString } = require("./helpers/test-utils");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("Post tests", function () {
    suite("solve tests", function () {
      test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .type("form")
          .send({ puzzle: puzzlesAndSolutions[0][0] })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { solution: puzzlesAndSolutions[0][1] });
            done(err);
          });
      });
      test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .type("form")
          .send({})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { error: "Required field missing" });
            done(err);
          });
      });
      test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .type("form")
          .send({ puzzle: createRandomString(81, false) })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
              error: "Invalid characters in puzzle",
            });
            done(err);
          });
      });
      test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .type("form")
          .send({ puzzle: createRandomString(80, true) })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
              error: "Expected puzzle to be 81 characters long",
            });
            done(err);
          });
      });
      test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
        chai
          .request(server)
          .keepOpen()
          .post("/api/solve")
          .type("form")
          .send({ puzzle: invalidPuzzles[0] })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { error: "Puzzle cannot be solved" });
            done(err);
          });
      });
    });
    suite("check tests", function () {
      test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .type("form")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "A3",
            value: 4,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { hoi: "hoi" });
            done(err);
          });
      });
    });
  });
});

//
//
// Check a puzzle placement with multiple placement conflicts: POST request to /api/check
// Check a puzzle placement with all placement conflicts: POST request to /api/check
// Check a puzzle placement with missing required fields: POST request to /api/check
// Check a puzzle placement with invalid characters: POST request to /api/check
// Check a puzzle placement with incorrect length: POST request to /api/check
// Check a puzzle placement with invalid placement coordinate: POST request to /api/check
// Check a puzzle placement with invalid placement value: POST request to /api/check
