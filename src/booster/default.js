const mtg = require("../mtg");
const _ = require("../_");
const memoize = require("mem");
const cardMapper = require("./card-mapper");

const getCardsByRarity = memoize(async (set, rarity) => {
  const cards = await mtg.card.where({ set, rarity });
  const mappedCards = await Promise.all(cards.map(cardMapper));
  return mappedCards.filter(card => card);
});

const chooseRare = async (set) => {
  const mythics = await getCardsByRarity(set, "Mythic Rare");

  if (mythics && !_.rand(8)) {
    return _.choose(1, mythics);
  }

  const rares = await getCardsByRarity(set, "Rare");

  return _.choose(1, rares);
};

const chooseUncos = async (set) => {
  const unco = await getCardsByRarity(set, "Uncommon");

  return _.choose(3, unco);
};

const chooseCommons = async (set) => {
  const common = await getCardsByRarity(set, "Common");
  return _.choose(10, common);
};

const chooseLand = async (set) => {
  const basic = await getCardsByRarity(set, "Basic Land");

  return _.choose(1, basic);
};

const makeBooster = async (set) => {
  return [
    ...await chooseRare(set),
    ...await chooseUncos(set),
    ...await chooseCommons(set),
    ...await chooseLand(set)
  ];
};

module.exports = makeBooster;