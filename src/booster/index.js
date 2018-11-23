const defaultBooster = require("./default");
const cardMapper = require("../card-mapper");

const getAndMapBooster = async (set) => {
  const booster = await defaultBooster(set);
  const boosterWithCardsTransformed = await Promise.all(booster.map(cardMapper));
  return boosterWithCardsTransformed.filter(card => card !== null );
};

module.exports = getAndMapBooster;