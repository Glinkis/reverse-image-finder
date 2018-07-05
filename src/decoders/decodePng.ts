import * as fs from "fs";
import { PNG } from "pngjs";
import { store, Image } from "../store";

/**
 * {@link https://github.com/lukeapage/pngjs}
 */
export const decodePng = async (path: string) =>
  new Promise<Image>((resolve, reject) => {
    const stream = fs.createReadStream(path);
    const png = new PNG();
    stream
      .pipe(png)
      .on("error", reject)
      .on("parsed", () =>
        resolve({
          data: png.data,
          width: png.width,
          height: png.height,
          path
        })
      );
  });

store.decoders.set(".png", decodePng);
