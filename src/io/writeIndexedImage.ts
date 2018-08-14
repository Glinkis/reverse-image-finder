import * as path from "path";
import * as sharp from "sharp";
import { indexSize } from "../consts";
import { ImageBuffer, store } from "../store";
import { getIndexDir } from "./getIndexDir";

export const writeIndexedImage = async (name: string, image: ImageBuffer) => {
  const { channels, data, width, height } = image;
  const file = path.join(getIndexDir(), name);
  const buffer = Buffer.from(data.buffer as ArrayBuffer);

  const resizedImage = await sharp(buffer, { raw: { channels, width, height } })
    .resize(indexSize, indexSize)
    .ignoreAspectRatio();

  const resizedBuffer = await resizedImage.toBuffer({
    resolveWithObject: true
  });

  await resizedImage.png().toFile(file);
  store.indexedFiles++;

  return {
    channels,
    data: resizedBuffer.data,
    height: resizedBuffer.info.height,
    width: resizedBuffer.info.width
  };
};
