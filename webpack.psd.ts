import { Configuration } from "webpack";

module.exports = {
  target: "node",
  devtool: "source-map",
  entry: "./psd.js/lib/psd.coffee",
  output: {
    path: __dirname,
    filename: "psdjs.js",
    library: "PSD",
    libraryTarget: "window"
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".coffee", ".json"]
  }
} as Configuration;
