import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";

module.exports = {
  watch: true,
  devtool: "source-map",
  target: "electron-renderer",
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  optimization: {
    runtimeChunk: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { compilerOptions: { module: "esnext" } }
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      },
      {
        test: /\.css$/,
        loaders: ["style-loader?sourceMap", "css-loader?sourceMap"]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".node", ".json"]
  }
} as Configuration;
