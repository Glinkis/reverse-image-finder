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

export const compareImage = async (path: string) => {
  const imageData = await resizeImage(path);

  const match = pixelmatch(
    store.imageData.data as any,
    imageData.data as any,
    null,
    imageData.width,
    imageData.height,
    {
      threshold: store.threshold
    }
  );

  return match / store.imageData.data.length < store.threshold;
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
