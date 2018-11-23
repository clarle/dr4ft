const boosterProvider = require("./booster");

const fetchBoosters = sets => Promise.all(sets.map(boosterProvider));

const sealed = async (sets, playersLength) => {
  return Promise.all(new Array(playersLength)
    .fill(sets)
    .map(fetchBoosters));
};

const draft = async (sets, playersLength) => {
  sets.reverse(); //TODO: change behavior! Now because game does pool.pop() we have to give him things like that
  
  return Promise.all(sets
    .reduce((acc, set) => acc.concat(new Array(playersLength).fill(set)), []) //TODO: change to flatMap when available in Node
    .map(boosterProvider));
};

module.exports = {
  sealed,
  draft
};