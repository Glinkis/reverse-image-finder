// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as path from "path";
import { store } from "./store";
import { decodeJpg } from "../decoders/decodeJpg";
import { decodePng } from "../decoders/decodePng";
import { decodePsd } from "../decoders/decodePsd";
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

const width = 64;
const height = 64;
const cache = new Map<string, Image>();

const cacheImageData = async (image: string) => {
  if (cache.has(image)) {
    return cache.get(image) as Image;
  }
  const decoded = await decodeImage(image);
  const resized = resizeImageData(decoded, width, height);
  cache.set(image, resized);
  return resized as Image;
};

const decodeImage = async (image: string) => {
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
