import * as React from "react";
import { SelectDirectory, SelectedDirectory } from "./SelectDirectory";
import { SelectImageFile, SelectedImageFile } from "./SelectImageFile";
import { Search } from "./Search";
import { Images } from "./Images";
import { Threshold } from "./Threshold";

export const App = () => (
  <div id="app">
    <SelectImageFile />
    <SelectedImageFile />
    <SelectDirectory />
    <SelectedDirectory />
    <Threshold />
    <Search />
    <Images />
  </div>
);
