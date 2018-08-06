import * as sharp from "sharp";
import { store } from "../store";
import { addAlphaChannel } from "../misc/addAlphaChannel";

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
