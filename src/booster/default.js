const mtg = require("../mtg");
const _ = require("../_");

const chooseRare = async (set) => {
  const mythics = await mtg.card.where({
    set,
    rarity: "Mythic Rare"
  });
    
  if(mythics && !_.rand(8)) {
    return _.choose(1, mythics);
  }

  const rares = await mtg.card.where({
    set,
    rarity: "Rare"
  });

  return _.choose(1, rares);
}; 

const chooseUncos = async (set) => {
  const unco = await mtg.card.where({
    set,
    rarity: "Uncommon"
  });
    
  return _.choose(3, unco);
};

const chooseLand = async (set) => {
  const basic = await mtg.card.where({
    set,
    rarity: "Basic Land"
  });

  return _.choose(1, basic);
};

const chooseCommons = async (set) => {
  const common = await mtg.card.where({
    set,
    rarity: "Common"
  });
  return _.choose(10, common);
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