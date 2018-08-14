import * as fs from "fs";
import * as path from "path";
import { decodePng } from "../decoders/decodePng";
import { getIndexDir } from "./getIndexDir";

export const readIndexedImage = async (name: string) => {
  const file = path.join(getIndexDir(), name);
  if (fs.existsSync(file)) {
    return await decodePng(file);
  }
};
