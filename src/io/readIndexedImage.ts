import * as fs from "fs";
import * as path from "path";
import { decodeWithSharp } from "../decoders/decodeWithSharp";
import { getIndexDir } from "./getIndexDir";

export const readIndexedImage = (name: string) => {
  const file = path.join(getIndexDir(), name);
  if (fs.existsSync(file)) {
    return decodeWithSharp(file);
  }
};
