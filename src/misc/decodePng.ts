import * as fs from "fs";
import { PNG } from "pngjs";

export const decodePng = async (image: string) => {
  return new Promise<ImageData>(resolve => {
    const data = fs
      .createReadStream(image)
      .pipe(new PNG())
      .on("parsed", () => resolve(data));
  });
};
