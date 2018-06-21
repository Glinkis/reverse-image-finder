import * as React from "react";
import { SelectDirectory, SelectedDirectory } from "./SelectDirectory";
import { SelectImageFile, SelectedImageFile } from "./SelectImageFile";
import { Search } from "./Search";
import { Images } from "./Images";

export const App = () => (
  <div id="app">
    <SelectImageFile />
    <SelectedImageFile />
    <SelectDirectory />
    <SelectedDirectory />
    <Search />
    <Images />
  </div>
);
