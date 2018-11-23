const rq = require("request-promise-native");
const config = require("./config.js");

const _get = (type, page, args) => rq({
  uri: `${config.endpoint}/${type}`,
  resolveWithFullResponse: true,
  qs: { page, ...args },
  json: true
});

const get = type => async args => {
  let page = 1;
  const { body, headers, statusCode } = await _get(type, page, args);

  if (statusCode !== 200) {
    throw new Error(`[${statusCode}] Err while fetching ${type}/${page}/${args} : ${body.error}`);
  }

  const elements = body[type];

  const remainingEls = headers["total-count"] - headers["count"];
  const pageSize = headers["page-size"];
  const maxPages = Math.ceil(remainingEls / pageSize);
  const remainingPages = new Array(maxPages).fill();

  const otherResponses = await Promise.all(remainingPages.map(() => _get(type, ++page, args)));
  otherResponses.forEach(({ body }) => elements.push(...body[type]));
  return elements;

};

module.exports = type => ({

  /** Gets a resource by its id. */
  find: id => rq({
    uri: `${config.endpoint}/${type}/${id}`,
    json: true,
    transform: el => {
      return el[type.slice(0, -1)];
    }
  }),

  /** Gets a resource with a given query. */
  where: get(type),

  all: () => get(type)({})

});
