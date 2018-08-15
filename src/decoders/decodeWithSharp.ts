import * as sharp from "sharp";
import { store } from "../store";

/**
 * Utilizes the sharp library to decode
 * multiple different image types.
 * {@link https://github.com/lovell/sharp}
 */
export const decodeWithSharp = async (imagePath: string) => {
  const buffer = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  return {
    channels: buffer.info.channels,
    data: buffer.data,
    height: buffer.info.height,
    width: buffer.info.width
  };
};

store.decoders.set(".png", decodeWithSharp);
store.decoders.set(".tif", decodeWithSharp);
store.decoders.set(".tiff", decodeWithSharp);
store.decoders.set(".jpg", decodeWithSharp);
store.decoders.set(".jpeg", decodeWithSharp);
store.decoders.set(".svg", decodeWithSharp);
