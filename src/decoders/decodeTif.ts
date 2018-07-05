// @ts-ignore
import * as Utif from "utif";
import { store } from "../store";
import { readFileAsync } from "../misc/promisified";

/**
 * {@link https://github.com/photopea/UTIF.js}
 */
const decodeTif = async (path: string) => {
  const buffer = await readFileAsync(path);
  const ifds = new Utif.decode(buffer);

  Utif.decodeImages(buffer, ifds);

  const { width, height } = ifds[0];
  const data = Utif.toRGBA8(ifds[0]);
  return { data, width, height, path };
};

store.decoders.set(".tif", decodeTif);
store.decoders.set(".tiff", decodeTif);
