// @ts-ignore
import * as PSD from "psd";
import { store } from "../misc/store";

/**
 * {@link https://github.com/meltingice/psd.js}
 */
const decodePsd = async (image: string) => {
  const psd = await PSD.open(image);
  return {
    data: psd.image.pixelData,
    width: psd.image.width(),
    height: psd.image.height()
  };
};

store.decoders.push({ ext: "psd", decode: decodePsd });
