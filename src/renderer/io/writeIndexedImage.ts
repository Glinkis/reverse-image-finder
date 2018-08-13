import * as path from "path";
import * as sharp from "sharp";
import { indexSize } from "../misc/consts";
import { ImageBuffer, store } from "../store";
import { getIndexDirectory } from "./getIndexDirectory";

export const writeIndexedImage = async (name: string, image: ImageBuffer) => {
  const { channels, data, width, height } = image;

  const indexDir = getIndexDirectory();
  const file = path.join(indexDir, name);
  const buffer = Buffer.from(data.buffer as ArrayBuffer);

  const resizedImage = await sharp(buffer, { raw: { channels, width, height } })
    .resize(indexSize, indexSize)
    .ignoreAspectRatio();

  const resizedBuffer = await resizedImage.toBuffer({
    resolveWithObject: true
  });

  await resizedImage.png().toFile(file);
  store.indexed++;

  return {
    channels,
    data: resizedBuffer.data,
    height: resizedBuffer.info.height,
    width: resizedBuffer.info.width
  };
};
