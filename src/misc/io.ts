import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import { app, remote } from "electron";

const indexedDir = (function createIndexDirectory() {
  if (!app) {
    return;
  }
  const userDataDir = app.getPath("userData");
  const dir = userDataDir + "/indexed/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
})();

const readFileAsync = util.promisify(fs.readFile);

export const readPixelData = async (name: string) => {
  if (indexedDir) {
    try {
      const pixelData = await readFileAsync(path.join(indexedDir, name));
      return pixelData as Uint8Array;
    } catch {}
  }
};

const writeFileAsync = util.promisify(fs.writeFile);

export const writePixelData = async (name: string, data: Uint8Array) => {
  if (indexedDir) {
    await writeFileAsync(path.join(indexedDir, name), data);
  }
};

const readdirAsync = util.promisify(fs.readdir);
const unlinkAsync = util.promisify(fs.unlink);

export const clearPixelData = async () => {
  if (indexedDir) {
    const files = await readdirAsync(indexedDir);
    for (const file of files) {
      await unlinkAsync(path.join(indexedDir, file));
    }
  }
};
