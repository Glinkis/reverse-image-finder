import { ImageBuffer } from "../store";
import { addChannels } from "./addChannels";

/**
 * Ensures that all images has the same amount of channel data.
 * @param images - Array of images to normalize.
 */
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
