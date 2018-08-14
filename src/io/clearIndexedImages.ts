import * as path from "path";
import { readdirAsync, unlinkAsync } from "../misc/promisified";
import { getIndexDir } from "./getIndexDir";

export const clearIndexedImages = async () => {
  const indexDir = getIndexDir();
  for (const file of await readdirAsync(indexDir)) {
    await unlinkAsync(path.join(indexDir, file));
  }
};
