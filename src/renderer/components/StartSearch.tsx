import * as React from "react";
import { store } from "../store";
import { searchForFiles } from "../misc/searchForFiles";

export const StartSearch = () => (
  <button onClick={startSearch}>Start Search</button>
);

const startSearch = () => {
  store.images = [];
  store.isSearching = true;
  searchForFiles();
};
