const cardMapper = require("./card-mapper");
const _ = require("lodash");

class Booster {
  constructor(set, rawcards) {
    if (!set) {
      throw new Error("set must not be empty");
    }
    if (!rawcards) {
      throw new Error("rawcards must not be empty");
    }
    this.set = set;
    this.rawcards = this.parseCards(rawcards);
    this.cardsTransformed = this.rawcards.map(card => cardMapper(card, rawcards));
    this.cardsByRarity = _.groupBy(this.cardsTransformed, "rarity");
  }

  parseCards(cards) {
    return cards;
  }

  getMythics() {
    return this.cardsByRarity["mythic"];
  }

  getRares() {
    return this.cardsByRarity["rare"];
  }

  getUncommons() {
    return this.cardsByRarity["uncommon"];
  }

  getCommons() {
    return this.cardsByRarity["common"];
  }

  getBasics() {
    return this.cardsByRarity["basic"];
  }

  chooseRare() {
    let rares = this.getRares();
    const mythics = this.getMythics();
    if (mythics && !_.random(8)) {
      rares = mythics;
    }

    return _.sample(rares);
  }

  chooseUncos() {
    const unco = this.getUncommons();
    return _.sampleSize(unco, 3);
  }

  chooseCommons() {
    const common = this.getCommons();
    return _.sampleSize(common, 10);
  }

  chooseLand() {
    const basic = this.getBasics();
    return _.sample(basic);
  }

  makeBooster() {
    const booster = [
      this.chooseRare(),
      ...this.chooseUncos(),
      ...this.chooseCommons(),
      this.chooseLand()
    ];
    this.addFoil(booster);
    return booster;
  }

  addFoil(booster) {
    if (_.random(7) < 1) {
      const card = _.sample(this.pickFoil());
      booster[booster.length - 1] = {
        ...card,
        foil: true
      };
    }
  }

  pickFoil() {
    const rngFoil = _.random(6);
    if (rngFoil < 1) {
      const rares = this.getRares();
      const mythics = this.getMythics();
      if (mythics && _.random(mythics.length + (rares.length * 2)) < mythics.length) {
        return mythics;
      }
      return rares;
    }
    if (rngFoil < 3)
      return this.getUncommons();
    return this.getCommons();
  }
}

module.exports = Booster;