import { observer } from "mobx-react";
import * as React from "react";
import { store } from "../store";
import { StartSearch } from "./StartSearch";
import { StopSearch } from "./StopSearch";

export const Search = observer(() => {
  if (store.directory === null || store.image == null) {
    return null;
  }
  return store.isSearching ? <StopSearch /> : <StartSearch />;
});
