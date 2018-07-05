import * as fs from "fs";
import { PNG } from "pngjs";
import { store, ImageBuffer } from "../store";

/**
 * {@link https://github.com/lukeapage/pngjs}
 */
export const decodePng = async (path: string) => {
  const stream = fs.createReadStream(path);
  const png = new PNG();

  // prettier-ignore
  await new Promise<ImageBuffer>((resolve, reject) =>
    stream.pipe(png).on("error", reject).on("parsed", resolve));

  return {
    data: png.data,
    width: png.width,
    height: png.height
  };
};

store.decoders.set(".png", decodePng);
