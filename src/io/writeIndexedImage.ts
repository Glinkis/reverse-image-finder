import * as path from "path";
import * as sharp from "sharp";
import { indexSize } from "../consts";
import { ImageBuffer, store } from "../store";
import { getIndexDir } from "./getIndexDir";

export const writeIndexedImage = async (name: string, image: ImageBuffer) => {
  const file = path.join(getIndexDir(), name);
  let { height, width, channels } = image;
  const buffer = Buffer.from(image.data.buffer as ArrayBuffer);

  // Use a maximum of four channels (red, green, blue, alpha).
  if (channels > 4) {
    channels = 4;
  }

  const sharpInstance = await sharp(buffer, {
    raw: { channels, height, width }
  });

  const resizedSharpInstance = sharpInstance
    .resize(indexSize, indexSize)
    .ignoreAspectRatio();

  const data = await resizedSharpInstance.toBuffer();
  width = indexSize;
  height = indexSize;

  await resizedSharpInstance.png().toFile(file);
  store.indexedFiles++;

  return { channels, height, width, data };
};
