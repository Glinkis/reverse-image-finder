import * as fs from "fs";
import * as path from "path";
import { decodePng } from "../decoders/decodePng";
import { getIndexDirectory } from "./getIndexDirectory";

export const readIndexedImage = async (name: string) => {
  const indexDir = getIndexDirectory();
  const file = path.join(indexDir, name);

  if (fs.existsSync(file)) {
    return await decodePng(file);
  }
};
