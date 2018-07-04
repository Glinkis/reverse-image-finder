// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as crypto from "crypto";
import { store } from "../store";
import { resizeImageData } from "./resizeImageData";
import { writePixelData, readPixelData } from "./io";
import { decodeImage } from "../decoders/decodeImage";

const width = 64;
const height = 64;

export const compareImages = async (a: string, b: string) => {
  if (a === b) return true;

  const image1 = await getImageData(a);
  const image2 = await getImageData(b);

  const match = pixelmatch(image1, image2, null, width, height, {
    threshold: store.threshold
  });

  return match / image1.length < store.threshold;
};

const getImageData = async (image: string) => {
  const hash = hashImage(image);
  return (await readPixelData(hash)) || (await indexPixelData(image, hash));
};

const indexPixelData = async (image: string, hash: string) => {
  const decoded = await decodeImage(image);
  const pixelData = resizeImageData(decoded, width, height);
  await writePixelData(hash, pixelData);
  store.indexed++;
  return pixelData;
};

const hashImage = (image: string) =>
  crypto
    .createHash("md5")
    .update(image)
    .digest("hex");
