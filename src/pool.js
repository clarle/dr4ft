const boosterProvider = require("./booster");

const fetchBoosters = async sets => {
  const boosters = await Promise.all(sets.map(boosterProvider));
  return boosters.reduce((acc, booster) => [...acc, ...booster] , []);
};

const sealed = async (sets, playersLength) => {
  return Promise.all(new Array(playersLength)
    .fill(sets)
    .map(fetchBoosters));
};

const draft = async (sets, playersLength) => {
  return Promise.all(sets
    .reduce((acc, set) => acc.concat(new Array(playersLength).fill(set)), []) //TODO: change to flatMap when available in Node
    .map(boosterProvider));
};

module.exports = {
  sealed,
  draft
};