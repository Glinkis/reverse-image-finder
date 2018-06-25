import * as fs from "fs";
import * as util from "util";
import { app, remote } from "electron";

const indexedDir = (function createIndexDirectory() {
  const userDataDir = (app || remote.app).getPath("userData");
  const dir = userDataDir + "/indexed/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
})();

const readFileAsync = util.promisify(fs.readFile);

export const readPixelData = async (name: string) => {
  try {
    const pixelData = await readFileAsync(indexedDir + name);
    return pixelData as Uint8Array;
  } catch {}
};

const writeFileAsync = util.promisify(fs.writeFile);

export const writePixelData = async (name: string, data: Uint8Array) => {
  await writeFileAsync(indexedDir + name, data);
};
