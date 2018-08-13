import * as path from "path";
import { readdirAsync, unlinkAsync } from "../misc/promisified";
import { getIndexDirectory } from "./getIndexDirectory";

export const clearIndexedImages = async () => {
  const indexDir = getIndexDirectory();

  for (const file of await readdirAsync(indexDir)) {
    await unlinkAsync(path.join(indexDir, file));
  }
};
