import * as sharp from "sharp";

/**
 * {@link https://github.com/lovell/sharp}
 */
export const decodeWithSharp = async (imagePath: string) => {
  const image = sharp(imagePath);
  const buffer = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = buffer.info;

  return {
    channels,
    data: buffer.data,
    height,
    width
  };
};
