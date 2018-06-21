import * as React from "react";
import { store } from "../misc/store";

export const StopSearch = () => (
  <button id="start-search" onClick={stopSearch}>
    Stop Search
  </button>
);

const stopSearch = () => {
  store.isSearching = false;
};
