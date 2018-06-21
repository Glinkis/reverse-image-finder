import * as React from "react";
import { store } from "../misc/store";

export const StartSearch = () => (
  <button id="start-search" onClick={startSearch}>
    Start Search
  </button>
);

const startSearch = () => {
  store.isSearching = true;
  store.similarImages.push({
    name: `example`,
    path: store.image
  });
};
