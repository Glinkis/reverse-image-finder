// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as path from "path";
import * as crypto from "crypto";
import "../decoders/decoders";
import { store } from "./store";
import { resizeImageData, Image } from "./resizeImageData";
import { writePixelData, readPixelData } from "./io";

export const compareImages = async (a: string, b: string) => {
  if (a === b) return true;

  const image1 = await getImageData(a);
  const image2 = await getImageData(b);

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

const getImageData = async (image: string) => {
  const hash = crypto
    .createHash("md5")
    .update(image)
    .digest("hex");

  const data = await readPixelData(hash);
  if (data) {
    return { data, width, height };
  }
  return await indexImage(image, hash);
};

const indexImage = async (image: string, hash: string) => {
  const decoded = await decodeImage(image);
  const resized = resizeImageData(decoded, width, height);
  await writePixelData(hash, resized.data);
  store.indexed++;
  return resized;
};

const decodeImage = async (image: string) => {
  const ext = path.extname(image).toLowerCase();
  const decode = store.decoders.get(ext);
  if (decode) {
    return await decode(image);
  }
  throw new Error(`${ext} is not a supported file type.`);
};
