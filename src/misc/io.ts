import * as fs from "fs";
import * as path from "path";
import { app, remote } from "electron";
import {
  readFileAsync,
  writeFileAsync,
  readdirAsync,
  unlinkAsync
} from "./promisified";
import { PNG } from "pngjs";

const indexedDir = (() => {
  const userDataDir = (app || remote.app).getPath("userData");
  const dir = userDataDir + "/indexed/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
})();

export const readPixelData = (name: string) => {
  const stream = fs.createReadStream(path.join(indexedDir, name));
  const png = new PNG();
  return new Promise<Buffer>(resolve => {
    stream
      .on("error", () => resolve())
      .pipe(png)
      .on("error", () => resolve())
      .on("parsed", () => resolve(png.data));
  });
};

export const writePixelData = (name: string, data: Buffer) => {
  const png = new PNG({ width: 64, height: 64 });
  png.data = data instanceof Buffer ? data : typedArrayToBuffer(data);
  const stream = fs.createWriteStream(path.join(indexedDir, name));
  png.pack().pipe(stream);
};

export const clearPixelData = async () => {
  const files = await readdirAsync(indexedDir);
  for (const file of files) {
    await unlinkAsync(path.join(indexedDir, file));
  }
};

function typedArrayToBuffer(array: Uint8Array | Buffer) {
  if (array instanceof Buffer) {
    return array;
  }
  const buffer = Buffer.from(array.buffer as ArrayBuffer);
  if (array.byteLength !== array.buffer.byteLength) {
    buffer.set(
      buffer.slice(array.byteOffset, array.byteOffset + array.byteLength)
    );
  }
  return buffer;
}
