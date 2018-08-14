import * as React from "react";
import { searchForFiles } from "../misc/searchForFiles";
import { store } from "../store";

export const StartSearch = () => (
  <button onClick={startSearch}>Start Search</button>
);

const startSearch = () => {
  store.matches = [];
  store.isSearching = true;
  searchForFiles();
};
