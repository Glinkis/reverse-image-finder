// @ts-ignore
import * as pixelmatch from "pixelmatch";
import { store } from "../store";
import { getImage } from "./getImage";

export const compareImages = async (path1: string, path2: string) => {
  if (path1 === path2) {
    return true;
  }

  const image1 = await getImage(path1);
  const image2 = await getImage(path2);

  const match = pixelmatch(
    image1.data as Buffer,
    image2.data as Buffer,
    null,
    image1.width,
    image1.height,
    { threshold: store.threshold }
  );

  return match / image1.data.length < store.threshold;
};
