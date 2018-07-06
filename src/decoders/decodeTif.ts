// @ts-ignore
import * as Utif from "utif";
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

store.decoders.set(".tif", decodeTif);
store.decoders.set(".tiff", decodeTif);
