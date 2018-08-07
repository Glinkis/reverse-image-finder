import * as fs from "fs";
import * as path from "path";
import { app, remote } from "electron";
import { readdirAsync, unlinkAsync } from "./promisified";
import { decodePng } from "../decoders/decodePng";
import { ImageBuffer, store } from "../store";
import * as sharp from "sharp";

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

export const writeIndexedImage = async (name: string, image: ImageBuffer) => {
  const { data, width, height } = image;
  const file = path.join(store.indexedDir, name);
  const buffer = Buffer.from(data.buffer as ArrayBuffer);

  const resizedImage = await sharp(buffer, {
    raw: { channels: 4, width, height }
  }).resize(64, 64);

  const resizedBuffer = await resizedImage.toBuffer({
    resolveWithObject: true
  });

  await resizedImage.png().toFile(file);
  store.indexed++;

  return {
    data: resizedBuffer.data,
    width: resizedBuffer.info.width,
    height: resizedBuffer.info.height
  };
};

export const clearIndexedImages = async () => {
  for (const file of await readdirAsync(store.indexedDir)) {
    await unlinkAsync(path.join(store.indexedDir, file));
  }
};
