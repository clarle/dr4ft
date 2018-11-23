const defaultBooster = require("./default");
const cardMapper = require("../card-mapper");

const getAndMapBooster = async (set) => {
  const booster = await defaultBooster(set);
  return Promise.all(booster.map(cardMapper));
};

module.exports = getAndMapBooster;