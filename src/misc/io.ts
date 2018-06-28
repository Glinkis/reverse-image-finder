import * as fs from "fs";
import * as path from "path";
import { app, remote } from "electron";
import {
  readFileAsync,
  writeFileAsync,
  readdirAsync,
  unlinkAsync
} from "./promisified";

const indexedDir = (() => {
  const userDataDir = (app || remote.app).getPath("userData");
  const dir = userDataDir + "/indexed/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
})();

export const readPixelData = async (name: string) => {
  try {
    const pixelData = await readFileAsync(path.join(indexedDir, name)).catch();
    return pixelData as Uint8Array;
  } catch {}
};

export const writePixelData = async (name: string, data: Uint8Array) => {
  await writeFileAsync(path.join(indexedDir, name), data);
};

export const clearPixelData = async () => {
  const files = await readdirAsync(indexedDir);
  for (const file of files) {
    await unlinkAsync(path.join(indexedDir, file));
  }
};
