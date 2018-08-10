import * as crypto from "crypto";
import { decodeImage } from "../decoders/decodeImage";
import { ImageBuffer, store } from "../store";
import { readIndexedImage, writeIndexedImage } from "./io";

export const getImage = async (imagePath: string) => {
  const hash = hashFilePath(imagePath);
  let image: ImageBuffer | undefined;

  try {
    image = await readIndexedImage(hash);
  } catch (error) {
    console.log(`Corrupt index, re-indexing file://${encodeURI(imagePath)}`);
  }

  if (image) {
    return image;
  }

  if (store.logIndexing) {
    console.log(`Indexing file://${encodeURI(imagePath)}.`);
  }

  image = await decodeImage(imagePath);
  return await writeIndexedImage(hash, image);
};

const hashFilePath = (filePath: string) =>
  crypto
    .createHash("md5")
    .update(filePath)
    .digest("hex");
