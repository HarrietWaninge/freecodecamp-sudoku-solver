const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("Post tests", function () {
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
  });
});

// Solve a puzzle with missing puzzle string: POST request to /api/solve
// Solve a puzzle with invalid characters: POST request to /api/solve
// Solve a puzzle with incorrect length: POST request to /api/solve
// Solve a puzzle that cannot be solved: POST request to /api/solve
// Check a puzzle placement with all fields: POST request to /api/check
// Check a puzzle placement with single placement conflict: POST request to /api/check
// Check a puzzle placement with multiple placement conflicts: POST request to /api/check
// Check a puzzle placement with all placement conflicts: POST request to /api/check
// Check a puzzle placement with missing required fields: POST request to /api/check
// Check a puzzle placement with invalid characters: POST request to /api/check
// Check a puzzle placement with incorrect length: POST request to /api/check
// Check a puzzle placement with invalid placement coordinate: POST request to /api/check
// Check a puzzle placement with invalid placement value: POST request to /api/check
