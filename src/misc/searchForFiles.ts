import { walkDirectory } from "./walkDirectory";
import { store } from "./store";
import { compareImage } from "./compareImages";

export const searchForFiles = () => {
  if (!store.directory) {
    return;
  }
  walkDirectory(store.directory, (error, files) => {
    store.isSearching = false;
    if (error) {
      console.error(error);
    }
    if (!files) {
      return;
    }
    for (const file of files) {
      if (file === store.image) {
        continue;
      }
      compareImage(file).then(isSimilar => {
        if (isSimilar) {
          store.images.push(file);
        }
      });
    }
  });
};
