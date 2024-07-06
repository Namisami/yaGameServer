const { series } = require('gulp'); 
const { tsTranspile, tsFilesWatch } = require('./tasks/tsTranspile.js');
require('dotenv').config();


exports.start = tsTranspile;
exports.default = series(tsTranspile, tsFilesWatch);
