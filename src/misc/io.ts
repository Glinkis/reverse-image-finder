import * as fs from "fs";
import * as path from "path";
import { app, remote } from "electron";
import { readdirAsync, unlinkAsync } from "./promisified";
import { PNG } from "pngjs";
import { decodePng } from "../decoders/decodePng";
import { ImageBuffer, store } from "../store";
import { resizeImageData } from "./resizeImageData";

store.indexedDir = (() => {
  const userDataDir = (app || remote.app).getPath("userData");
  const dir = path.join(userDataDir, "indexed");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return dir;
})();

export const readIndexedImage = (name: string) => {
  const file = path.join(store.indexedDir, name);

  if (fs.existsSync(file)) {
    return decodePng(file);
  }
};

export const writeIndexedImage = (name: string, image: ImageBuffer) => {
  const file = path.join(store.indexedDir, name);
  const resized = resizeImageData(image, 64, 64);

  Object.assign(new PNG(), resized)
    .pack()
    .pipe(fs.createWriteStream(file))
    .on("close", () => store.indexed++);

  return resized;
};

export const clearIndexedImages = async () => {
  for (const file of await readdirAsync(store.indexedDir)) {
    await unlinkAsync(path.join(store.indexedDir, file));
  }
};
