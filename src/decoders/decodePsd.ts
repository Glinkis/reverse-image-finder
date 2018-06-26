// @ts-ignore
import * as PSD from "psd";
import { store } from "../misc/store";
import { readFileAsync } from "../misc/promisified";

/**
 * {@link https://github.com/meltingice/psd.js}
 */
const decodePsd = async (image: string) => {
  const data = await readFileAsync(image);
  const psd = new PSD(data);
  psd.parse(data);
  return {
    data: psd.image.pixelData,
    width: psd.image.width(),
    height: psd.image.height()
  };
};

store.decoders.set(".psd", decodePsd);
