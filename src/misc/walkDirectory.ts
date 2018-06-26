import * as fs from "fs";
import * as path from "path";
import { store } from "./store";
import { readdirAsync, statAsync } from "./promisified";

export const walkDirectory = async (dir: string) => {
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
      const result = await walkDirectory(file).catch(console.error);
      if (result) {
        results = results.concat(result);
      }
      if (!--pending) {
        return results;
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (store.decoders.has(ext)) {
        results.push(file);
      }
    }
    store.searchedFiles++;
    if (!--pending) {
      return results;
    }
  }
};
