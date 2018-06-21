import * as imageDiffr from "image-diffr";
import { store } from "./store";

export const compareImage = async (image: string) => {
  const diff = await imageDiffr.exec(store.image, image, {
    threshold: 0
  });
  return diff.percent < store.threshold;
};
