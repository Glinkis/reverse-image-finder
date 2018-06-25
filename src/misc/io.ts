import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import { app } from "electron";

const indexedDir = (function createIndexDirectory() {
  const userDataDir = app.getPath("userData");
  const dir = userDataDir + "/indexed/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
})();

const readFileAsync = util.promisify(fs.readFile);

export const readPixelData = async (name: string) => {
  try {
    const pixelData = await readFileAsync(path.join(indexedDir, name));
    return pixelData as Uint8Array;
  } catch {}
};

const writeFileAsync = util.promisify(fs.writeFile);

export const writePixelData = async (name: string, data: Uint8Array) => {
  await writeFileAsync(path.join(indexedDir, name), data);
};

const readdirAsync = util.promisify(fs.readdir);
const unlinkAsync = util.promisify(fs.unlink);

export const clearPixelData = async () => {
  const files = await readdirAsync(indexedDir);
  for (const file of files) {
    await unlinkAsync(path.join(indexedDir, file));
  }
};
