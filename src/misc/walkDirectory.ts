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
  let searched = 0;

  const updateSearched = setInterval(() => {
    store.searchedFiles = searched;
  }, 500);

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

      const stat = await statAsync(file).catch(console.warn);

      if (stat && stat.isDirectory()) {
        await walkDir(file, callback, filter).catch(console.warn);
      } else {
        searched++;

        if (filter && !filter(file)) {
          continue;
        }

        callback(file);
      }
    }
  };
  await walkDir(dir, callback, filter);
  clearInterval(updateSearched);
  store.isSearching = false;
};
