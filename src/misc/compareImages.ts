// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as path from "path";
import { decodePsd } from "./decodePsd";
import { decodePng } from "././decodePng";
import { decodeJpg } from "./decodeJpg";
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

  console.log(imageData, match);

  return match / store.imageData.data.length < store.threshold;
};

export const resizeImage = async (path: string) => {
  const img = new Image();
  img.src = await parseImage(path);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
  return ctx.getImageData(0, 0, WIDTH, HEIGHT);
};

export const parseImage = async (image: string) => {
  switch (path.extname(image).toLowerCase()) {
    case ".jpg":
      return image;
    case ".png":
      return image;
    case ".psd":
      const psd = await decodePsd(image);
      return "data:image/png;base64," + arrayBufferToBase64(psd.data);
  }
};

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
