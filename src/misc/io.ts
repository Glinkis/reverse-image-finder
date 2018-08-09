import { app, remote } from "electron";
import * as fs from "fs";
import * as path from "path";
import * as sharp from "sharp";
import { decodePng } from "../decoders/decodePng";
import { ImageBuffer, store } from "../store";
import { readdirAsync, unlinkAsync } from "./promisified";

store.indexedDir = (() => {
  const userDataDir = (app || remote.app).getPath("userData");
  const dir = path.join(userDataDir, "indexed");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return dir;
})();

export const readIndexedImage = async (name: string) => {
  const file = path.join(store.indexedDir, name);

  if (fs.existsSync(file)) {
    return await decodePng(file);
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
    height: resizedBuffer.info.height,
    width: resizedBuffer.info.width
  };
};

export const clearIndexedImages = async () => {
  for (const file of await readdirAsync(store.indexedDir)) {
    await unlinkAsync(path.join(store.indexedDir, file));
  }
};
