const { series, src, dest } = require('gulp'); 
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config.js');
const { tsTranspile, tsFilesWatch } = require('./tasks/tsTranspile.js');
require('dotenv').config();


function build() {
  return tsTranspile()
}

exports.build = build;
exports.default = series(tsTranspile, tsFilesWatch);
