const fs = require("fs");
const defaultBooster = require("./default");
const mtg = require("../mtg");
const memoize = require("mem");

let boosterGenerators = {};
const memoizedFetch = memoize(mtg.card.where);

const makeBooster = async (set) => {
  const rawCards = await memoizedFetch({ set });
  const builtGenerator = boosterGenerators[set];
  if (builtGenerator) {
    return builtGenerator.makeBooster();
  }

  let boosterMaker = defaultBooster;

  const custBoosterFile = `${__dirname}/custom/${set.toUpperCase()}.js`;
  if (fs.existsSync(custBoosterFile)) {
    boosterMaker = require(custBoosterFile);
  }
  boosterGenerators[set] = new boosterMaker(set, rawCards);
  return boosterGenerators[set].makeBooster();
};

module.exports = makeBooster;