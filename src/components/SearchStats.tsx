import { observer } from "mobx-react";
import * as React from "react";
import { store } from "../store";

export const SearchStats = () => (
  <React.Fragment>
    <SearchedFiles />
    <IndexedFiles />
    <MatchedFiles />
  </React.Fragment>
);

const SearchedFiles = observer(() => {
  if (!store.searchedFiles) {
    return null;
  }
  return <div>{`Searched ${store.searchedFiles} files.`}</div>;
});

const IndexedFiles = observer(() => {
  if (!store.indexedFiles) {
    return null;
  }
  return <div>{`Indexed ${store.indexedFiles} images.`}</div>;
});

const MatchedFiles = observer(() => {
  if (!store.matches.length) {
    return null;
  }
  return <div>{`Matched ${store.matches.length} images.`}</div>;
});
