// @ts-ignore
import * as pixelmatch from "pixelmatch";
import * as crypto from "crypto";
import { store } from "../store";
import { writeIndexedImage, readIndexedImage } from "./io";
import { decodeImage } from "../decoders/decodeImage";

export const compareImages = async (path1: string, path2: string) => {
  if (path1 === path2) return true;

  const image1 = await getImage(path1);
  const image2 = await getImage(path2);

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

const getImage = async (imagePath: string) => {
  const hash = hashFilePath(imagePath);

  const indexedImage = await readIndexedImage(hash).catch(err => {
    console.log(`Corrupted file: ${err}, reindexing.`);
  });

  if (indexedImage) {
    return indexedImage;
  }

  const decodedImage = await decodeImage(imagePath);
  return await writeIndexedImage(hash, decodedImage);
};

const hashFilePath = (filePath: string) =>
  crypto
    .createHash("md5")
    .update(filePath)
    .digest("hex");
