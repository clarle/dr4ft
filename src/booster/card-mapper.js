const _ = require("../_");

const toCard = ({ set, name, layout, rarity, names, cmc, colors, types, number, supertypes, manaCost, imageUrl, multiverseid }, cards) => {
  rarity = rarity.split(" ")[0].toLowerCase();

  //Fix GRN guilgate names
  if (set === "GRN" && /\s\(.\)$/.test(name)) {
    name = name.substring(0, name.length - 4);
  }

  if (/^basic/i.test(rarity))
    if (/snow-covered/i.test(name))
      rarity = "special";
    else
      rarity = "basic";

  // Keep only the non-flipped cards
  // Flipped cards have an mciNumber or a number containing the letter b
  if (/^double-faced$|^flip|^split$/i.test(layout) && /b/i.test(number))
    return;

  if (/split|aftermath/i.test(layout))
    name = names.join(" // ");

  name = _.ascii(name);

  if (/^split$|^aftermath$/i.test(layout)) {
    const [pairedCard] = cards.filter(card => card.number === `${number}`.replace(/a/, "b"));
    cmc += pairedCard.cmc;
    if(colors !== pairedCard.colors) {
      colors.push(...pairedCard.colors);
    }
  } 

  const color = !colors || !colors.length
    ? "colorless"
    : colors.length > 1
      ? "multicolor"
      : colors[0].toLowerCase();

  const picUrl = imageUrl || `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseid}&type=card`;

  return {
    name,
    names: names,
    color,
    rarity,
    type: types[types.length - 1],
    layout: layout,
    cmc: cmc || 0,
    manaCost: manaCost || "",
    isDoubleFaced: /^double-faced$/i.test(layout),
    supertypes: supertypes || [],
    url: picUrl,
    sets: {
      [set]: {
        rarity,
        url: picUrl
      }
    },
  };
};

module.exports = toCard;