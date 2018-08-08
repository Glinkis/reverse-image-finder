import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";
import * as path from "path";

module.exports = {
  devtool: "source-map",
  target: "electron-renderer",
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
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
  node: {
    __dirname: false,
    __filename: false
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
