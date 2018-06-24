// @ts-ignore
import * as PSD from "psd";

export const decodePsd = async (image: string) => {
  const psd = await PSD.open(image);
  return {
    data: psd.image.pixelData,
    width: psd.image.width(),
    height: psd.image.height()
  };
};
