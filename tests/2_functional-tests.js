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
      test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
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
      test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
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
            coordinate: "A2",
            value: 3,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { valid: true });
            done(err);
          });
      });
      test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
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
            assert.deepEqual(res.body, {
              valid: false,
              conflict: ["row"],
            });
            done(err);
          });
      });
      test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .type("form")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "B1",
            value: 3,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
              valid: false,
              conflict: ["column", "row"],
            });
            done(err);
          });
      });
      test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
        chai
          .request(server)
          .keepOpen()
          .post("/api/check")
          .type("form")
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: "H8",
            value: 9,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
              valid: false,
              conflict: ["column", "row", "region"],
            });
            done(err);
          });
      });
    });
    test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .type("form")
        .send()
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "Required field(s) missing" });
          done(err);
        });
    });
    test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .type("form")
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: "J8",
          value: 9,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "Invalid coordinate" });
          done(err);
        });
    });
    test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .type("form")
        .send({
          puzzle: createRandomString(80, true),
          coordinate: "a9",
          value: 9,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            error: "Expected puzzle to be 81 characters long",
          });
          done(err);
        });
    });
    test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .type("form")
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: "M10",
          value: 9,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "Invalid coordinate" });
          done(err);
        });
    });
    test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .type("form")
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: "i9",
          value: 99,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "Invalid value" });
          done(err);
        });
    });
    test("Check a puzzle placement with the same value as is in that coordinate", function (done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .type("form")
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: "A1",
          value: 1,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { valid: true });
          done(err);
        });
    });
  });
});

// Check a puzzle placement with invalid placement value: POST request to /api/check
