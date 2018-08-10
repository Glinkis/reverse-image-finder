import * as fs from "fs";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration } from "webpack";

const nodeModules: { [key: string]: any } = {};
fs.readdirSync("node_modules")
  .filter(item => [".bin"].indexOf(item) === -1) // exclude the .bin folder
  .forEach(mod => {
    nodeModules[mod] = "commonjs " + mod;
  });

export default {
  devtool: "source-map",
  entry: path.resolve(__dirname, "src", "index.tsx"),
  externals: nodeModules,
  module: {
    rules: [
      {
        include: /src/,
        loader: "ts-loader",
        options: { compilerOptions: { module: "esnext" } },
        test: /\.tsx?$/
      },
      {
        loaders: ["style-loader?sourceMap", "css-loader?sourceMap"],
        test: /\.css$/
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  optimization: {
    minimize: false,
    runtimeChunk: true
  },
  output: {
    path: path.resolve(__dirname, "app")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".node", ".json"]
  },
  target: "electron-renderer"
} as Configuration;
