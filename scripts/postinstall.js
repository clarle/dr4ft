/* eslint no-console: "off" */
const fs = require("fs");
const serverConfig = require("../src/config");
const allSets = require("../src/make/allsets");

// Download Allsets.json
if(!fs.existsSync("data/AllSets.json")) {
  console.log("No AllSets.json detected. Downloading the file...");
  allSets.download("https://mtgjson.com/json/AllSets.json", "data/AllSets.json", () => {
    console.log("Download of AllSets.json completed");
  });
}

// Manage lib directory
const libDir = "public/lib";
if (!fs.existsSync(libDir)) {
  console.log("Populating public/lib...");
  fs.mkdirSync(libDir);
  fs.symlinkSync("../../node_modules/utils/utils.js", `${libDir}/utils.js`);
  fs.symlinkSync("../../node_modules/ee/ee.js", `${libDir}/ee.js`);
  fs.createReadStream("node_modules/engine.io-client/engine.io.js").pipe(fs.createWriteStream(`${libDir}/engine.io.js`));
  fs.createReadStream("node_modules/normalize.css/normalize.css").pipe(fs.createWriteStream(`${libDir}/normalize.css`));
}

// Create the log dir
if(!fs.existsSync(serverConfig.LOGDIR)) {
  fs.mkdirSync(serverConfig.LOGDIR);
}
console.log("Finished installing configurations...");
