// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as path from "path";
import * as crypto from "crypto";
import { store } from "./store";
import { decodeJpg } from "../decoders/decodeJpg";
import { decodePng } from "../decoders/decodePng";
import { decodePsd } from "../decoders/decodePsd";
import { resizeImageData, Image } from "./resizeImageData";
import { writePixelData, readPixelData } from "./io";

export const compareImages = async (a: string, b: string) => {
  const image1 = await saveImageData(a);
  const image2 = await saveImageData(b);

  const match = pixelmatch(
    image1.data,
    image2.data,
    null,
    image1.width,
    image1.height,
    {
      threshold: store.threshold
    }
  );

  return match / image1.data.length < store.threshold;
};

const width = 64;
const height = 64;

const saveImageData = async (image: string) => {
  const hash = crypto
    .createHash("md5")
    .update(image)
    .digest("hex");

  const pixelData = await readPixelData(hash);
  if (pixelData) {
    return { data: pixelData, width, height };
  }

  const decoded = await decodeImage(image);
  const resized = resizeImageData(decoded, width, height);
  await writePixelData(hash, resized.data);
  store.indexed++;

  return resized as Image;
};

const decodeImage = async (image: string) => {
  const ext = path.extname(image).toLowerCase();
  switch (ext) {
    case ".jpg":
      return await decodeJpg(image);
    case ".png":
      return await decodePng(image);
    case ".psd":
      return await decodePsd(image);
  }
  throw new Error(`Invalid extension: ${ext}.`);
};
