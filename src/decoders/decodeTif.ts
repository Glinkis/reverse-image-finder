import * as sharp from "sharp";
import { store } from "../store";

const decodeTif = async (imagePath: string) => {
  const image = await sharp(imagePath);
  const buffer = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = buffer.info;

  if (buffer.info.channels === 3) {
    buffer.data = addAlphaChannel(buffer.data, width, height);
  }

  return {
    data: buffer.data,
    width: buffer.info.width,
    height: buffer.info.height
  };
};

store.decoders.set(".tif", decodeTif);
store.decoders.set(".tiff", decodeTif);

const addAlphaChannel = (rgb: Buffer, width: number, height: number) => {
  const rgba = new Uint8Array(width * height * 4);

  for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
    rgba[j + 0] = rgb[i + 0];
    rgba[j + 1] = rgb[i + 1];
    rgba[j + 2] = rgb[i + 2];
    rgba[j + 3] = 255;
  }

  return Buffer.from(rgba.buffer as ArrayBuffer);
};
