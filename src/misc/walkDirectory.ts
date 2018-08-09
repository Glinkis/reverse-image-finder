import { Stats } from "fs";
import * as path from "path";
import { store } from "../store";
import { readdirAsync, statAsync } from "./promisified";

type FileFilter = (file: string) => boolean;

type DirWalker = (
  dir: string,
  callback: (file: string) => void,
  filter?: FileFilter
) => void;

export const walkDirectory: DirWalker = async (dir, callback, filter) => {
  let list: string[] | undefined;

  try {
    list = await readdirAsync(dir);
  } catch (error) {
    console.log(`Could not read files in ${dir}, due to ${error}.`);
    return;
  }

  for (let file of list) {
    if (!store.isSearching) {
      return;
    }

    file = path.resolve(dir, file);

    let stat: Stats | undefined;

    try {
      stat = await statAsync(file);
    } catch (error) {
      console.log(`Could not get stat of ${file}, due to ${error}.`);
      continue;
    }

    if (stat.isDirectory()) {
      await walkDirectory(file, callback, filter);
      continue;
    }

    if (filter && !filter(file)) {
      continue;
    }

    callback(file);
  }
};
