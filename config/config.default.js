/* eslint no-console: "off" */
"use strict";

const execSync = require("child_process").execSync;

var versionInfo = "noVersion";
try {
  versionInfo = execSync("git describe --always --long")
    .toString().trim();
} catch(err) {
  console.log(err);
}

let versionInfoParts = versionInfo.split("-");

const VERSION =
  versionInfoParts.length === 3

  // Show the number of commits past the most recent tag, and the commit hash
  // identifier. For example, `v2.0.0+3 (123abc)` indicates three commits past
  // version 2.0.0, at commit `123abc`. (In the `git-describe` output, there is
  // always a `g` before the commit hash, which stands for 'git', so we remove
  // that.)
    ? `${versionInfoParts[0]}+${versionInfoParts[1]} (${versionInfoParts[2].slice(1)})`

    // If there is no tag, just display the commit hash.
    : versionInfo;

module.exports = {
  PORT: process.env.PORT || 1337,
  VERSION: process.env.VERSION || VERSION,
  SITE_TITLE: process.env.SITE_TITLE ||["dr4ft", "info"].join("."),
  MOTD: process.env.MOTD || [],
  LOGDIR: process.env.LOGDIR || "./data/log/"
};