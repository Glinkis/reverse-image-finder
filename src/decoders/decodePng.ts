import * as fs from "fs";
import { PNG } from "pngjs";

export const decodePng = async (image: string) => {
  return new Promise<ImageData>(resolve => {
    fs.createReadStream(image)
      .pipe(new PNG())
      .on("parsed", function(this: PNG) {
        resolve({
          data: new Uint8ClampedArray(),
          width: this.width,
          height: this.height
        });
      });
  });
};
