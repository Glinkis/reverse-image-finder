import * as path from "path";
import { store } from "../store";
import "./decodePdf";
import "./decodePsd";
import "./decodeWithSharp";

/**
 * Decodes any of the supported image formats.
 * @param imagePath - Path to the image file.
 */
export const decodeImage = (imagePath: string) => {
  const extension = path.extname(imagePath).toLowerCase();
  const decode = store.decoders.get(extension);

  if (decode) {
    return decode(imagePath);
  }

  throw new TypeError(`${extension} is not a supported file type.`);
};
