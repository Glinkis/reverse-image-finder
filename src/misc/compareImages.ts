// @ts-ignore
import * as pixelmatch from "pixelmatch";
import { store } from "../store";
import { addAlphaChannel } from "./addAlphaChannel";
import { getImage } from "./getImage";

export const compareImages = async (path1: string, path2: string) => {
  if (path1 === path2) {
    return true;
  }

  const image1 = await getImage(path1);
  const image2 = await getImage(path2);

  if (image1.channels === 3 && image2.channels === 4) {
    addAlphaChannel(image1);
  } else if (image1.channels === 4 && image2.channels === 3) {
    addAlphaChannel(image2);
  }

  if (image1.data.byteLength !== image2.data.byteLength) {
    throw new Error("Image buffers are not the same size.");
  }

  if (image1.data.equals(image2.data)) {
    return true;
  }

  const match = pixelmatch(image1.data, image2.data, null, image1.width, image1.height, {
    threshold: store.threshold
  }); // prettier-ignore

  return match / image1.data.length < store.threshold;
};
