const path = require('path');
require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  devtool: "eval-source-map",
  entry: {
    main: path.resolve(__dirname, './public/assets/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
}
