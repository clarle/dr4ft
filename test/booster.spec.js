/* eslint-env node, mocha */
const booster = require("../src/booster/default");
const assert = require("assert");

describe("Acceptance tests for Booster making", () => {
  it("should return an array of cards", () => {
    booster("ktk")
      .then(cards => {
        assert.ok(Array.isArray(cards));
      });
  });
  it("should return an array of 14 cards if no basic land", () => {
    booster("dka")
      .then(cards => {
        assert.ok(cards.length === 14);
      });
  });
});