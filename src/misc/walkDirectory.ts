import * as path from "path";
import { store } from "../store";
import { readdirAsync, statAsync } from "./promisified";

type FileFilter = (file: string) => boolean;

export const walkDirectory = async (dir: string, filter?: FileFilter) => {
  store.isSearching = true;
  let results: string[] = [];

  const list = await readdirAsync(dir).catch(console.error);

  if (!list) {
    return results;
  }

  let pending = list.length;

  if (!pending) {
    return results;
  }

  for (let file of list) {
    if (!store.isSearching) {
      return results;
    }

    file = path.resolve(dir, file);

    const stat = await statAsync(file).catch(console.error);

    if (stat && stat.isDirectory()) {
      const result = await walkDirectory(file, filter).catch(console.error);

      if (result) {
        results = results.concat(result);
      }

      if (!--pending) {
        return results;
      }
    } else {
      if (filter && !filter(file)) 
        continue;
      }

      results.push(file);
    }

    store.searchedFiles++;

    if (!--pending) {
      return results;
    }
  }

  return results;
};
