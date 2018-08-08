import * as path from "path";
import { store } from "../store";
import "./decodeJpg";
import "./decodePng";
import "./decodePsd";
import "./decodeTif";
import "./decodePdf";
import "./decodeSvg";

export const decodeImage = (imagePath: string) => {
  const ext = path.extname(imagePath).toLowerCase();
  const decode = store.decoders.get(ext);

  if (decode) {
    return decode(imagePath);
  }

  throw new Error(`${ext} is not a supported file type.`);
};

export const extensions = [...store.decoders.keys()].map(key =>
  key.substring(1, key.length)
);
