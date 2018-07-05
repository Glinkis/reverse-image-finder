// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as crypto from "crypto";
import { store } from "../store";
import { resizeImageData } from "./resizeImageData";
import { writeIndexedImage, readIndexedImage } from "./io";
import { decodeImage } from "../decoders/decodeImage";

export const compareImages = async (a: string, b: string) => {
  if (a === b) return true;

  const image1 = await getImage(a);
  const image2 = await getImage(b);

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

const getImage = async (path: string) => {
  const hash = hashImage(path);
  return (await readIndexedImage(hash)) || (await indexPixelData(path, hash));
};

const indexPixelData = async (path: string, hash: string) => {
  const decoded = await decodeImage(path);
  const resized = resizeImageData(decoded, 64, 64);
  await writeIndexedImage(hash, resized);
  store.indexed++;
  return resized;
};

const hashImage = (path: string) =>
  crypto
    .createHash("md5")
    .update(path)
    .digest("hex");
