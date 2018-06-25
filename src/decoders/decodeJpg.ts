import * as jpeg from "jpeg-js";
import * as fs from "fs";
import { Image } from "../misc/resizeImageData";
import { store } from "../misc/store";

const decodeJpg = async (image: string) => {
  return new Promise<Image>((resolve, reject) => {
    fs.readFile(image, null, (err, encodedData) => {
      if (err) {
        reject(err);
      }
      const { data, width, height } = jpeg.decode(encodedData, true);
      resolve({ data, width, height });
    });
  });
};

store.decoders.push(
  { ext: "jpg", decode: decodeJpg },
  { ext: "jpeg", decode: decodeJpg }
);
