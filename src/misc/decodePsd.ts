import * as PSD from "psd";

export const decodePsd = async (image: string) => {
  const psd = await PSD.open(image);
  return psd.image.toPng();
};
