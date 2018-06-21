// @ts-ignoreimport { decodePng } from "./decodePng";
import * as pixelmatch from "pixelmatch";
import * as path from "path";
import { decodePsd } from "./decodePsd";
import { decodePng } from "././decodePng";
import { decodeJpg } from "./decodeJpg";
import { store } from "./store";

export const compareImage = async (image: string) => {
  const imageData = await parseImage(image);

  const match = pixelmatch(
    store.imageData.data as any,
    imageData.data as any,
    null,
    imageData.width,
    imageData.height,
    {
      threshold: store.threshold
    }
  );

  return match / store.imageData.data.length < store.threshold;
};

export async function parseImage(image: string) {
  switch (path.extname(image).toLowerCase()) {
    case ".jpg":
      return await decodeJpg(image);
    case ".png":
      return await decodePng(image);
    case ".psd":
      return await decodePsd(image);
  }
}
