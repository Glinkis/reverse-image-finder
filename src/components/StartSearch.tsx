import * as React from "react";
import { store } from "../misc/store";
import { searchForFiles } from "../misc/searchForFiles";

export const StartSearch = () => (
  <button id="start-search" onClick={startSearch}>
    Start Search
  </button>
);

const startSearch = () => {
  store.images = [];
  store.isSearching = true;
  searchForFiles();
};