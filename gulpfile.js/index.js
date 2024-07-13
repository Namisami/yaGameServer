const { series } = require("gulp");
const { tsTranspile, tsFilesWatch } = require("./tasks/tsTranspile.js");
require("dotenv").config();


function build() {
  return tsTranspile();
}

exports.build = build;
exports.default = series(tsTranspile, tsFilesWatch);
