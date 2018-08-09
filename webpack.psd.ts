import { Configuration } from "webpack";

export default {
  devtool: "source-map",
  entry: "./psd.js/lib/psd.coffee",
  module: {
    rules: [
      {
        loader: "coffee-loader",
        test: /\.coffee$/
      }
    ]
  },
  output: {
    filename: "psdjs.js",
    library: "PSD",
    libraryTarget: "window",
    path: __dirname
  },
  resolve: {
    extensions: [".js", ".coffee", ".json"]
  },
  target: "node"
} as Configuration;
