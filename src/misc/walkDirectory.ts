import * as path from "path";
import { store } from "../store";
import { readdirAsync, statAsync } from "./promisified";

type FileFilter = (file: string) => boolean;

export const walkDirectory = async (
  dir: string,
  callback: (file: string) => void,
  filter?: FileFilter
) => {
  store.isSearching = true;
  const walkDir = async (
    dir: string,
    callback: (file: string) => void,
    filter?: FileFilter
  ) => {
    const list = await readdirAsync(dir).catch(console.error);

    if (!list) {
      return;
    }

    for (let file of list) {
      if (!store.isSearching) {
        return;
      }

      file = path.resolve(dir, file);

      const stat = await statAsync(file).catch(console.error);

      if (stat && stat.isDirectory()) {
        await walkDir(file, callback, filter).catch(console.error);
      } else {
        store.searchedFiles++;

        if (filter && !filter(file)) {
          continue;
        }

        callback(file);
      }
    }
  };
  await walkDir(dir, callback, filter);
  store.isSearching = false;
};
