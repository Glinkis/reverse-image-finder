import * as React from "react";
import * as path from "path";
import { observer } from "mobx-react";
import { store } from "../misc/store";
import { shell } from "electron";

export const Images = observer(() => (
  <div>
    <SearchedFiles />
    <IndexedFiles />
    <MatchedFiles />
    {store.images.map(imageRow)}
  </div>
));

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

export const imageRow = (image: string, i?: number) => (
  <div key={i}>
    <a href="#" onClick={() => shell.showItemInFolder(image)}>
      {path.basename(image)}
    </a>
  </div>
);
