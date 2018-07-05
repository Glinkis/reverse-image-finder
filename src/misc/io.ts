import * as fs from "fs";
import * as path from "path";
import { app, remote } from "electron";
import { readdirAsync, unlinkAsync } from "./promisified";
import { PNG } from "pngjs";
import { decodePng } from "../decoders/decodePng";
import { typedArrayToBuffer } from "./typedArrayToBuffer";

const indexedDir = (() => {
  const userDataDir = (app || remote.app).getPath("userData");
  const dir = userDataDir + "/indexed/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
})();

export const readPixelData = async (name: string) => {
  const file = path.join(indexedDir, name);
  if (fs.existsSync(file)) {
    const image = await decodePng(file);
    return image.data;
  }
};

export const writePixelData = (name: string, data: Buffer) => {
  const file = path.join(indexedDir, name);
  const png = new PNG({ width: 64, height: 64 });
  png.data = typedArrayToBuffer(data);
  png.pack().pipe(fs.createWriteStream(file));
};

export const clearPixelData = async () => {
  for (const file of await readdirAsync(indexedDir)) {
    await unlinkAsync(path.join(indexedDir, file));
  }
};
