import * as React from "react";
import { observer } from "mobx-react";
import { store } from "../store";

export const SearchStats = () => (
  <React.Fragment>
    <SearchedFiles />
    <IndexedFiles />
    <MatchedFiles />
  </React.Fragment>
);

const SearchedFiles = observer(() => {
  if (!store.searchedFiles) return null;
  return <div>{`Searched ${store.searchedFiles} files.`}</div>;
});

const IndexedFiles = observer(() => {
  if (!store.indexed) return null;
  return <div>{`Indexed ${store.indexed} images.`}</div>;
});

const MatchedFiles = observer(() => {
  if (!store.images.length) return null;
  return <div>{`Matched ${store.images.length} images.`}</div>;
});
