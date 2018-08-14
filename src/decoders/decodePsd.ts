import * as psdjs from "../../psdjs";
import { store } from "../store";

// Force import of PSD library.
console.log(psdjs);

/**
 * Decodes PSD files with the psd.js library.
 * {@link https://github.com/meltingice/psd.js}
 */
export const decodePsd = async (imagePath: string) => {
  // @ts-ignore
  const psd = PSD.fromFile(imagePath);

  psd.parse();

  let channels = psd.image.channels();
  if (channels > 4) {
    channels = 4;
  }

  return {
    channels,
    data: psd.image.pixelData,
    height: psd.image.height(),
    width: psd.image.width()
  };
};

store.decoders.set(".psd", decodePsd);
