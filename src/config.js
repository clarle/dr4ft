let config = require("../config/config.default.js");
const fs = require("fs");

if(fs.existsSync("config.js")) {
  const newServerConfig = require("../config.js");
  Object.assign(config, newServerConfig);
}

module.exports = config;
