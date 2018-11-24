const BoosterWithExtraCards = require("./withextracards");
const DefaultBooster = require("../default");
const _ = require("lodash");

class M19Booster extends BoosterWithExtraCards {
  constructor(set, rawCards) {
    super(set, rawCards);
    [this.commons, this.dualLands] = _.partition(DefaultBooster.prototype.getCommons.call(this),
      card => card.type !== "Land");
    
  }

  getBoosterCardLimit() {
    return 280;
  }

  chooseLand() {
    const isDualLand = _.random(12) < 6;
    return _.sample(isDualLand ? this.dualLands : this.getBasics());
  }

  getCommons() {
    return this.commons;
  }
}

module.exports = M19Booster;