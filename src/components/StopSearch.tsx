import * as React from "react";
import { store } from "../misc/store";

export const StopSearch = () => (
  <button onClick={stopSearch}>Stop Search</button>
);

const stopSearch = () => {
  store.isSearching = false;
};
