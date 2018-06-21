import { walkDirectory } from "./walkDirectory";
import { store } from "./store";
import { getFileExtension } from "./getFileExtension";

export const searchForFiles = () => {
  walkDirectory(store.directory, (error, files) => {
    store.isSearching = false;
    if (error) {
      store.errors.push(error);
    }
    processFiles(files);
  });
};

const processFiles = (files: string[]) => {
  for (const file of files) {
    for (const extension of store.extensions) {
      if (getFileExtension(file) === extension) {
        store.images.push(file);
      }
    }
  }
};
