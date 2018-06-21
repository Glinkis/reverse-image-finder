// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as path from "path";
import { decodePsd } from "./decodePsd";
import { decodePng } from "././decodePng";
import { decodeJpg } from "./decodeJpg";
import { store } from "./store";

const WIDTH = 512;
const HEIGHT = 512;

const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");

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
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
  return ctx.getImageData(0, 0, WIDTH, HEIGHT);
};

export const parseImage = async (image: string) => {
  switch (path.extname(image).toLowerCase()) {
    case ".psd":
      return await decodePsd(image);
    default:
      return image;
  }
};
