const boosterProvider = require("./booster");

const fetchBoosters = sets => Promise.all(sets.map(boosterProvider));

const sealed = async (sets, playersLength) => {
  return Promise.all(new Array(playersLength)
    .fill(sets)
    .map(fetchBoosters));
};

module.exports = {
  sealed
};