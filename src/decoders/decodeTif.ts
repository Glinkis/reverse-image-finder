// @ts-ignore
import * as Utif from "utif";
import { store } from "../misc/store";
import { readFileAsync } from "../misc/promisified";

/**
 * {@link https://github.com/photopea/UTIF.js}
 */
const decodeTif = async (image: string) => {
  const buffer = await readFileAsync(image);
  const ifds = new Utif.decode(buffer);

  Utif.decodeImages(buffer, ifds);

  const { width, height } = ifds[0];
  const data = Utif.toRGBA8(ifds[0]);

  return { data, width, height };
};

store.decoders.push(
  { ext: "tif", decode: decodeTif },
  { ext: "tiff", decode: decodeTif }
);
