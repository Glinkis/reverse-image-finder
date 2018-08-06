// @ts-ignore
import * as PSD from "../../psd.js/index.js";
import { store } from "../store";
import { readFileAsync } from "../misc/promisified";

const decodePsd = async (imagePath: string) => {
  const fileBuffer = await readFileAsync(imagePath);
  const psd = new PSD(fileBuffer);
  psd.parse();
  return {
    data: psd.image.pixelData,
    width: psd.image.width(),
    height: psd.image.height()
  };
};

store.decoders.set(".psd", decodePsd);
