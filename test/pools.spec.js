/* eslint-env node, mocha */
const assert = require("assert");
const pool = require("../src/pool");

describe("Acceptance tests for Pools", () => {
  describe("can create pool for sealed", () => {
    it("should return an array of cards", () => {
      pool.sealed(["ktk"], 1)
        .then(ret => {
          assert.ok(Array.isArray(ret));
        });
    });
    it("should return an array of array cards", async () => {
      const ret = await pool.sealed(["ktk"], 1);
      assert.ok(Array.isArray(ret[0]));
    });
    it("should return an array of cards for every player", async () => {
      const ret = await pool.sealed(["ktk"], 2);
      assert.ok(ret.length == 2);
    });
    it("should return an array of cards for multiple boosters", () => {
      pool.sealed(["dka","dka", "dka"], 1)
        .then(ret => {
          assert.ok(Array.isArray(ret));
        });
    });
  });
});