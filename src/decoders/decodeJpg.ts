import * as jpeg from "jpeg-js";
import * as fs from "fs";

export const decodeJpg = async (image: string) => {
  return new Promise<ImageData>((resolve, reject) => {
    fs.readFile(image, null, (err, encodedData) => {
      if (err) {
        reject(err);
      }
      const { data, width, height } = jpeg.decode(encodedData, true);
      resolve({ data: new Uint8ClampedArray(data), width, height });
    });
  });
};
