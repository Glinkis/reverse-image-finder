import * as fs from "fs";
import * as path from "path";
import { app, remote } from "electron";
import { readdirAsync, unlinkAsync } from "./promisified";
import { PNG } from "pngjs";
import { decodePng } from "../decoders/decodePng";
import { ImageBuffer } from "../store";

const indexedDir = (() => {
  const userDataDir = (app || remote.app).getPath("userData");
  const dir = userDataDir + "/indexed/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
})();

export const readIndexedImage = (name: string) => {
  const file = path.join(indexedDir, name);
  if (fs.existsSync(file)) {
    return decodePng(file);
  }
};

export const writeIndexedImage = (name: string, image: ImageBuffer) => {
  const file = path.join(indexedDir, name);
  const png = new PNG({ width: image.width, height: image.height });
  png.data = image.data;
  png.pack().pipe(fs.createWriteStream(file));
};

export const clearIndexedImages = async () => {
  for (const file of await readdirAsync(indexedDir)) {
    await unlinkAsync(path.join(indexedDir, file));
  }
};
