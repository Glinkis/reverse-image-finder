import { walkDirectory } from "./walkDirectory";
import { store } from "../store";
import { compareImages } from "./compareImages";
import * as path from "path";

export const searchForFiles = async () => {
  if (!store.directory) {
    return;
  }

  store.searchedFiles = 0;
  store.indexed = 0;
  store.isSearching = true;

  const files = await walkDirectory(store.directory, checkFileSupport);

  if (!files || !store.image) {
    return;
  }

  for (const file of files) {
    if (!store.isSearching) {
      return;
    }

    if (file === store.image) {
      continue;
    }

    if (await compareImages(store.image, file)) {
      store.images.push(file);
    }
  }

  store.isSearching = false;
};

export const checkFileSupport = (file: string) => {
  const ext = path.extname(file).toLowerCase();
  return store.decoders.has(ext);
};