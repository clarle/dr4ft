/* eslint-env node, mocha */
const assert = require("assert");
const mtg = require("../src/mtg");

describe("Acceptance tests for MTG API", () => {
  describe("can fetch cards using clause where", () => {
    it("should return an array of cards", async () => {
      const cards = await mtg.card.where({set: "ktk"});
      assert.ok(Array.isArray(cards)); 
    });
    it("should return the right amount of cards", async () => {
      const cards = await mtg.card.where({set: "ktk"});
      assert.ok(cards.length === 269); 
    });
  });
});