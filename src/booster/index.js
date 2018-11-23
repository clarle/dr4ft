const defaultBooster = require("./default");

const makeBooster = async (set) => {
  return defaultBooster(set);
};

module.exports = makeBooster;