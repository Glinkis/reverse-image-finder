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

  await walkDirectory(store.directory, handleImageFile, checkFileSupport);

  store.isSearching = false;
};

const handleImageFile = async (file: string) => {
  if (!store.image || !store.isSearching || file === store.image) {
    return;
  }
  if (await compareImages(store.image, file)) {
    store.images.push(file);
  }
};

export const checkFileSupport = (file: string) => {
  const ext = path.extname(file).toLowerCase();
  return store.decoders.has(ext);
};
