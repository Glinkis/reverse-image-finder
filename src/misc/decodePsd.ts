import * as PSD from "psd";

export const decodePsd = async (image: string) => {
  const psd = await PSD.open(image);
  const png = psd.image.toPng();
  return { width: png.width, height: png.height, data: png.data } as ImageData;
};
