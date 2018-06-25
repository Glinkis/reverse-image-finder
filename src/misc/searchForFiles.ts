import { walkDirectory } from "./walkDirectory";
import { store } from "./store";
import { compareImages } from "./compareImages";

export const searchForFiles = async () => {
  if (!store.directory) {
    return;
  }
  store.searchedFiles = 0;
  store.indexed = 0;

  const files = await walkDirectory(store.directory);
  store.isSearching = false;
  if (!files || !store.image) {
    return;
  }
  for (const file of files) {
    if (file === store.image) {
      continue;
    }
    compareImages(store.image, file).then(isSimilar => {
      if (isSimilar) {
        store.images.push(file);
      }
    });
  }
};
