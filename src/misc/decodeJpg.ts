import * as fs from "fs";
import * as jpeg from "jpeg-js";

export const decodeJpg = async (image: string) => {
  return new Promise<ImageData>(resolve => {
    fs.readFile(image, null, (err, data) => {
      resolve(jpeg.decode(data));
    });
  });
};
