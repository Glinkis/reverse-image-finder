import * as path from "path";
import { store } from "../store";
import "./decodePdf";
import "./decodePsd";
import "./decodeWithSharp";

export const decodeImage = (imagePath: string) => {
  const extension = path.extname(imagePath).toLowerCase();
  const decode = store.decoders.get(extension);

  if (decode) {
    return decode(imagePath);
  }

  throw new Error(`${extension} is not a supported file type.`);
};

export const extensions = [...store.decoders.keys()].map(key =>
  key.substring(1, key.length)
);
