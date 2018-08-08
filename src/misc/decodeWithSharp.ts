/**
 * {@link https://github.com/lovell/sharp}
 */
export const decodeWithSharp = async (imagePath: string) => {
  const sharp = await import("sharp");
  const image = await sharp(imagePath);
  const buffer = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = buffer.info;

  if (buffer.info.channels === 3) {
    buffer.data = addAlphaChannel(buffer.data);
  }

  return {
    data: buffer.data,
    width,
    height
  };
};

const addAlphaChannel = (rgb: Buffer) => {
  const rgba = new Uint8Array((rgb.length / 3) * 4);

  for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
    rgba[j + 0] = rgb[i + 0];
    rgba[j + 1] = rgb[i + 1];
    rgba[j + 2] = rgb[i + 2];
    rgba[j + 3] = 255;
  }

  return Buffer.from(rgba.buffer as ArrayBuffer);
};
