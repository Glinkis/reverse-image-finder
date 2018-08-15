import * as path from "path";
import { readdirAsync, statAsync } from "../misc/promisified";
import { store } from "../store";

export const walkDirectory = async (
  dir: string,
  callback: (file: string) => void,
  filter?: (file: string) => void
) => {
  let list;
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

    let stat;
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
