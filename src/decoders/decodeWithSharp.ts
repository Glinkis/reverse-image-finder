import * as sharp from "sharp";
import { store } from "../store";

/**
 * Utilizes the sharp library to decode multiple
 * different image types.
 * {@link https://github.com/lovell/sharp}
 */
export const decodeWithSharp = async (imagePath: string) => {
  const image = sharp(imagePath);
  const buffer = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = buffer.info;

  return {
    channels,
    data: buffer.data,
    height,
    width
  };
};

store.decoders.set(".png", decodeWithSharp);
store.decoders.set(".tif", decodeWithSharp);
store.decoders.set(".tiff", decodeWithSharp);
store.decoders.set(".jpg", decodeWithSharp);
store.decoders.set(".jpeg", decodeWithSharp);
store.decoders.set(".svg", decodeWithSharp);
