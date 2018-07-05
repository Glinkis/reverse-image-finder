// @ts-ignore
import * as PSD from "../../psd.js/index.js";
import { store } from "../store";
import { readFileAsync } from "../misc/promisified";
import { typedArrayToBuffer } from "../misc/typedArrayToBuffer";

/**
 * {@link https://github.com/meltingice/psd.js}
 */
const decodePsd = async (path: string) => {
  const data = await readFileAsync(path);
  const psd = new PSD(data);
  psd.parse();
  return {
    data: typedArrayToBuffer(psd.image.pixelData),
    width: psd.image.width(),
    height: psd.image.height()
  };
};

store.decoders.set(".psd", decodePsd);
