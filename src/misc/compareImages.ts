// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as path from "path";
import { decodePsd } from "../decoders/decodePsd";
import { store } from "./store";
import { decodePng } from "../decoders/decodePng";
import { decodeJpg } from "../decoders/decodeJpg";
import { resizeImageData, Image } from "./resizeImageData";

export const compareImages = async (a: string, b: string) => {
  const image1 = await cacheImageData(a);
  const image2 = await cacheImageData(b);

  const match = pixelmatch(
    image1.data,
    image2.data,
    null,
    image1.width,
    image1.height,
    {
      threshold: store.threshold
    }
  );

  return match / image1.data.length < store.threshold;
};

const bufferToUint8Array = (buffer: Buffer) => {
  const array = new Uint8Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    array[i] = buffer[i];
  }
  return array;
};

const width = 256;
const height = 256;
const cache = new Map<string, Image>();

const cacheImageData = async (image: string) => {
  if (!cache.has(image)) {
    const decoded = await decodeImage(image);
    const resized = resizeImageData(decoded, width, height);
    cache.set(image, resized);
  }
  return cache.get(image) as Image;
};

export const decodeImage = async (image: string) => {
  const ext = path.extname(image).toLowerCase();
  switch (ext) {
    case ".jpg":
      return await decodeJpg(image);
    case ".png":
      return await decodePng(image);
    case ".psd":
      return await decodePsd(image);
  }
  throw new Error(`Invalid extension: ${ext}.`);
};
