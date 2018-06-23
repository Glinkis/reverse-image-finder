// @ts-ignore
import * as PSD from "psd";
import { PNG } from "../../node_modules/@types/pngjs";

export const decodePsd = async (image: string) => {
  const psd = await PSD.open(image);
  return psd.image.toPng() as PNG;
};
