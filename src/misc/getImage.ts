import * as crypto from "crypto";
import { decodeImage } from "../decoders/decodeImage";
import { readIndexedImage } from "../io/readIndexedImage";
import { writeIndexedImage } from "../io/writeIndexedImage";
import { store } from "../store";

/**
 * Gets an indexed version of the image,
 * and indexes the image if none exists.
 * @param imagePath - Path to the image.
 */
export const getIndexedImage = async (imagePath: string) => {
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
