// @ts-ignore
import * as PSD from "psd";

export const decodePsd = async (image: string) => {
  const psd = await PSD.open(image);
  const png = psd.image.toPng();
  return "data:image/png;base64," + byteArrayToBase64(png.data);
};

const byteArrayToBase64 = (bytes: Uint8Array | Uint8ClampedArray) => {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
