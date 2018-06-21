import * as React from "react";
import { observer } from "mobx-react";
import { store } from "../misc/store";
import { StopSearch } from "./StopSearch";
import { StartSearch } from "./StartSearch";

export const Search = observer(() => {
  if (store.directory === null) {
    return null;
  }
  return store.isSearching ? <StopSearch /> : <StartSearch />;
});
