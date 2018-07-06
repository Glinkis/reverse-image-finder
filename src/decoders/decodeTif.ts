// @ts-ignore
import * as Utif from "utif";
import * as sharp from "sharp";
import { store } from "../store";
import { readFileAsync } from "../misc/promisified";

/**
 * {@link https://github.com/photopea/UTIF.js}
 */
const decodeTif = async (imagePath: string) => {
  const fileBuffer = await readFileAsync(imagePath);
  const ifds = new Utif.decode(fileBuffer);

  Utif.decodeImages(fileBuffer, ifds);

  return {
    data: Utif.toRGBA8(ifds[0]),
    width: ifds[0].width,
    height: ifds[0].height
  };
};

const decodeTif2 = async (imagePath: string) => {
  const image = await sharp(imagePath);
  const metadata = await image.metadata();
  const buffer = await image.raw().toBuffer();

  if (!metadata.width || !metadata.height) {
    throw new Error("No width or height in image metadata.");
  }

  return {
    data: buffer,
    width: metadata.width,
    height: metadata.height
  };
};

store.decoders.set(".tif", decodeTif);
store.decoders.set(".tiff", decodeTif);
