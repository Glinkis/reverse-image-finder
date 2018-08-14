import { ImageBuffer } from "../store";
import { addChannels } from "./addChannels";

export function normalizeChannels(...images: ImageBuffer[]) {
  let max = 0;

  for (const image of images) {
    if (image.channels > max) {
      max = image.channels;
    }
  }

  for (const image of images) {
    if (image.channels !== max) {
      addChannels(image, max);
    }
  }
}
