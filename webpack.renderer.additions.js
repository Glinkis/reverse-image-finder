const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/renderer/main.tsx",
  module: {
    rules: [{
      test: /\.node$/,
      loader: "node-loader"
    }, {
      test: /\.tsx$/,
      loader: "ts-loader"
    }]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".node", ".json"]
  }
};