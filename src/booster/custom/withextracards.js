const DefaultBooster = require("../default");

class WithExtraCards extends DefaultBooster {
  constructor(set, rawCards) {
    super(set, rawCards);
  }

  parseCards(cards) {
    const cardLimit = this.getBoosterCardLimit();
    return DefaultBooster.prototype.parseCards.call(this, cards)
      .filter(({number}) => {
        return number <= cardLimit;
      });
  }

  getBoosterCardLimit() {
    return 1000;
  }
}

module.exports = WithExtraCards;