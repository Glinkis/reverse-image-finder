import * as fs from "fs";
import * as path from "path";
import { app, remote } from "electron";
import { readdirAsync, unlinkAsync } from "./promisified";
import { PNG } from "pngjs";
import { decodePng } from "../decoders/decodePng";

const indexedDir = (() => {
  const userDataDir = (app || remote.app).getPath("userData");
  const dir = userDataDir + "/indexed/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
})();

export const readPixelData = async (name: string) => {
  try {
    const { data } = await decodePng(path.join(indexedDir, name));
    return data as Buffer;
  } catch {}
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
