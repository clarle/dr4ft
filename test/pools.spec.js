/* eslint-env node, mocha */
const assert = require("assert");
const pool = require("../src/pool");

describe("Acceptance tests for Pools", () => {
  describe("can create pool for sealed", () => {
    it("should return an array of boosters", () => {
      pool.sealed(["ktk"], 1)
        .then(ret => {
          assert.ok(Array.isArray(ret));
        });
    });
    it("should return an array of array cards", () => {
      pool.sealed(["ktk"], 1)
        .then(ret => {
          assert.ok(Array.isArray(ret[0]));
        });
    });
    it("should return an array of cards for multiple boosters", () => {
      pool.sealed(["dka", "dka", "dka"], 1)
        .then(ret => {
          assert.ok(Array.isArray(ret[0]));
        });
    });
    it("should return an array of boosters per player", () => {
      pool.sealed(["ktk", "ktk"], 1)
        .then(ret => {
          assert.ok(ret[0].length === 30);
        });
    });
    it("should return an array of cards for every player", () => {
      pool.sealed(["ktk"], 2)
        .then(ret => {
          assert.ok(ret.length == 2);
        });
    });
  });
  describe("can create pool for draft", () => {
    it("should return an array of cards", () => {
      pool.draft(["ktk"], 1)
        .then(ret => {
          assert.ok(Array.isArray(ret));
        });
    });
    it("should return an array of length equal to sets number per player", async () => {
      const ret = await pool.draft(["ktk", "dka"], 2);
      assert.ok(ret.length === 4);
    });
  });
});