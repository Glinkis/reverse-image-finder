import * as psdjs from "../../psdjs";
import { store } from "../store";

// Force import of PSD library.
console.log(psdjs);

const decodePsd = async (imagePath: string) => {
  // @ts-ignore
  const psd = PSD.fromFile(imagePath);

  psd.parse();

  return {
    channels: psd.image.channels(),
    data: psd.image.pixelData,
    height: psd.image.height(),
    width: psd.image.width()
  };
};

store.decoders.set(".psd", decodePsd);
