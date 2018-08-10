// @ts-ignore
import * as pixelmatch from "pixelmatch";
import { store } from "../store";
import { getImage } from "./getImage";

export const compareImages = async (path1: string, path2: string) => {
  if (path1 === path2) {
    return true;
  }

  const image1 = await getImage(path1);
  const image2 = await getImage(path2);

  if (image1.channels === 3 && image2.channels === 4) {
    image1.data = addAlphaChannel(image1.data);
  }

  if (image1.channels === 4 && image2.channels === 3) {
    image2.data = addAlphaChannel(image2.data);
  }

  if (image1.data.byteLength !== image2.data.byteLength) {
    throw new Error("Image buffers are not of the same size.");
  }

  if (image1.data.equals(image2.data)) {
    return true;
  }

  const match = pixelmatch(
    image1.data,
    image2.data,
    null,
    image1.width,
    image1.height,
    { threshold: store.threshold }
  );

  return match / image1.data.length < store.threshold;
};

const addAlphaChannel = (rgb: Buffer) => {
  const rgba = new Uint8Array((rgb.length / 3) * 4);

  for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
    rgba[j + 0] = rgb[i + 0];
    rgba[j + 1] = rgb[i + 1];
    rgba[j + 2] = rgb[i + 2];
    rgba[j + 3] = 255;
  }

  return Buffer.from(rgba.buffer as ArrayBuffer);
};
