// @ts-ignore
import * as pixelmatch from "pixelmatch";
import * as crypto from "crypto";
import { store, ImageBuffer } from "../store";
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
  let image: ImageBuffer | undefined;

  try {
    image = await readIndexedImage(hash);
  } catch (error) {
    console.log(`Corrupted file: ${error}, reindexing.`);
  }

  if (image) {
    return image;
  }

  image = await decodeImage(imagePath);
  return await writeIndexedImage(hash, image);
};

const hashFilePath = (filePath: string) =>
  crypto
    .createHash("md5")
    .update(filePath)
    .digest("hex");
