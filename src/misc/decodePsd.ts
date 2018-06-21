import * as PSD from "psd";

export const decodePsd = async (image: string) => {
  const psd = await PSD.open(image);
  const png = psd.image.toPng();
  return "data:image/png;base64," + arrayBufferToBase64(png.data);
};

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
