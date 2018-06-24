import { walkDirectory } from "./walkDirectory";
import { store } from "./store";
import { compareImages } from "./compareImages";

export const searchForFiles = () => {
  if (!store.directory) {
    return;
  }
  store.searchedFiles = 0;

  walkDirectory(store.directory, (error, files) => {
    store.isSearching = false;
    if (error) {
      console.error(error);
    }
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
  });
};
