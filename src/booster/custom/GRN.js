const DefaultBooster = require("../default");
const BoosterWithExtraCards = require("./withextracards");
const _ = require("lodash");

// No basics. Always 1 common slots are occupied by guildgates
class GRNBooster extends BoosterWithExtraCards {
  constructor(set, rawCards) {
    super(set, rawCards);
    [this.commons, this.dualLands] = _.partition(DefaultBooster.prototype.getCommons.call(this),
      card => card.type !== "Land");
  }

  getBoosterCardLimit() {
    return 259;
  }

  getBasics() {
    return this.dualLands;
  }

  getCommons() {
    return this.commons;
  }
}

module.exports = GRNBooster;