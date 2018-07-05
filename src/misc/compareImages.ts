// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as crypto from "crypto";
import { store } from "../store";
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
  const image = await readIndexedImage(hash);

  if (image) {
    return image;
  } else {
    const decoded = await decodeImage(path);
    return await writeIndexedImage(hash, decoded);
  }
};

const hashImage = (path: string) =>
  crypto
    .createHash("md5")
    .update(path)
    .digest("hex");
