/* eslint-env node, mocha */
const cardMapper = require("../src/card-mapper");
const assert = require("assert");
const mtg = require("../src/mtg");

describe("Acceptance tests for Card Mapper", () => {
  it("should return an object with field name", async () => {
    const card = await mtg.card.find("f7e7251f1970392a1bf69acefedc10665c48d228");
    const mappedCard = await cardMapper(card);
    assert.ok(mappedCard.name !== undefined);
  });
  it("should return undefined if the card is split with number b", async () => {
    const card = await mtg.card.find("cf7608ba0be10a515c9aca6bde297b27ef5e1b74");
    const mappedCard = await cardMapper(card);
    assert.ok(mappedCard === undefined);
  });
  it("should add cmc of fused card", async () => {
    const card = await mtg.card.find("f7e7251f1970392a1bf69acefedc10665c48d228");
    const mappedCard = await cardMapper(card);
    assert.ok(mappedCard.cmc === 8);
  });
});