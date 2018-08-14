import { ImageBuffer } from "../store";

export const addChannels = (image: ImageBuffer, target: number) => {
  const { width, height, data, channels } = image;
  const array = new Uint8Array(width * height * target);
  const buffer = Buffer.from(array.buffer as ArrayBuffer);

  for (let i = 0, j = 0; i < data.byteLength; i += channels, j += target) {
    for (let k = 0; k < target; k++) {
      buffer[j + k] = k < channels ? image.data[i + k] : 255;
    }
  }

  image.data = buffer;
  image.channels = target;
};
