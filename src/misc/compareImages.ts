// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as path from "path";
import { decodePsd } from "../decoders/decodePsd";
import { store } from "./store";

const WIDTH = 256;
const HEIGHT = 256;

const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

export const compareImages = async (a: string, b: string) => {
  const image1 = await cacheImageData(a);
  const image2 = await cacheImageData(b);

  const match = pixelmatch(
    new Uint8Array(image1.data),
    new Uint8Array(image2.data),
    null,
    image1.width,
    image1.height,
    {
      threshold: store.threshold
    }
  );

  return match / image1.data.length < store.threshold;
};

export const resizeImage = async (path: string) => {
  const img = new Image();
  img.src = await parseImage(path);
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
  return ctx.getImageData(0, 0, WIDTH, HEIGHT);
};

export const parseImage = async (image: string) => {
  const ext = path.extname(image).toLowerCase();
  switch (ext) {
    case ".jpg":
      return image;
    case ".png":
      return image;
    case ".psd":
      return await decodePsd(image);
  }
  throw new Error(`Invalid extension: ${ext}.`);
};

const cache = new Map<string, ImageData>();
const cacheImageData = async (image: string) => {
  if (!cache.has(image)) {
    cache.set(image, await resizeImage(image));
  }
  return cache.get(image) as ImageData;
};
