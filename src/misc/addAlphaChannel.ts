import { ImageBuffer } from "../store";

export const addAlphaChannel = (imageBuffer: ImageBuffer) => {
  const size = imageBuffer.data.length;
  const rgba = new Uint8Array((size / 3) * 4);

  for (let i = 0, j = 0; i < size; i += 3, j += 4) {
    rgba[j + 0] = imageBuffer.data[i + 0];
    rgba[j + 1] = imageBuffer.data[i + 1];
    rgba[j + 2] = imageBuffer.data[i + 2];
    rgba[j + 3] = 255;
  }

  imageBuffer.data = Buffer.from(rgba.buffer as ArrayBuffer);
  imageBuffer.channels = 4;
};
