import { walkDirectory } from "../io/walkDirectory";
import { store } from "../store";
import { checkFileSupport } from "./checkFileSupport";
import { compareImages } from "./compareImages";

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
  store.searchedFiles++;
  if (!store.image || file === store.image) {
    return;
  }
  if (await compareImages(store.image, file)) {
    store.images.push(file);
  }
};
