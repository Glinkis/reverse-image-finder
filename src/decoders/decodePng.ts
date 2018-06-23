import * as fs from "fs";
import { PNG } from "pngjs";
import { Image } from "../misc/resizeImageData";

export const decodePng = async (image: string) => {
  return new Promise<Image>(resolve => {
    fs.createReadStream(image)
      .pipe(new PNG())
      .on("parsed", function(this: PNG) {
        resolve({
          data: this.data,
          width: this.width,
          height: this.height
        });
      });
  });
};
