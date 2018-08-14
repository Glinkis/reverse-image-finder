import * as crypto from "crypto";
import { decodeImage } from "../decoders/decodeImage";
import { readIndexedImage } from "../io/readIndexedImage";
import { writeIndexedImage } from "../io/writeIndexedImage";
import { store } from "../store";

export const getImage = async (imagePath: string) => {
  const hash = crypto
    .createHash("md5")
    .update(imagePath)
    .digest("hex");

  let image;

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
