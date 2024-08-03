const path = require("path");
const nodeExternals = require("webpack-node-externals");
require("dotenv").config();

module.exports = {
  mode: process.env.NODE_ENV,
  target: "node",
  devtool: "eval-source-map",
  externals: [nodeExternals()],
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@config": path.resolve(__dirname, "src/config"),
      "@database": path.resolve(__dirname, "src/database"),
      "@routers": path.resolve(__dirname, "src/routers"),
      "@events": path.resolve(__dirname, "src/events"),
      "@serializers": path.resolve(__dirname, "src/serializers"),
      "@controllers": path.resolve(__dirname, "src/controllers"),
    },
  },
};
