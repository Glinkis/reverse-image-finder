import * as psdjs from "../../psdjs";
import { readFileAsync } from "../misc/promisified";
import { store } from "../store";
console.log(psdjs);

const decodePsd = async (imagePath: string) => {
  const fileBuffer = await readFileAsync(imagePath);

  // @ts-ignore
  const psd = new PSD(fileBuffer);
  psd.parse();
  return {
    data: psd.image.pixelData,
    height: psd.image.height(),
    width: psd.image.width()
  };
};

store.decoders.set(".psd", decodePsd);
