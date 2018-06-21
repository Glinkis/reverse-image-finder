import { walkDirectory } from "./walkDirectory";
import { store } from "./store";

export const searchForFiles = () => {
  walkDirectory(store.directory, (error, files) => {
    store.isSearching = false;
    if (error) {
      console.error(error);
      store.errors.push(error);
    }
    if (files) {
      for (const file of files) {
        setTimeout(() => store.images.push(file));
      }
    }
  });
};
