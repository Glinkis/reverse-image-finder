import * as React from "react";
import { SelectDirectory, SelectedDirectory } from "./SelectDirectory";
import { SelectImageFile, SelectedImageFile } from "./SelectImageFile";
import { Search } from "./Search";
import { Images } from "./Images";
import { Threshold } from "./Threshold";
import { ClearIndexed } from "./ClearIndexed";
import { SearchStats } from "./SearchStats";
import { OpenIndexedDirectory } from "./OpenIndexedDirectory";

export const App = () => (
  <div id="app">
    <SelectImageFile />
    <SelectedImageFile />
    <SelectDirectory />
    <SelectedDirectory />
    <OpenIndexedDirectory />
    <ClearIndexed />
    <Threshold />
    <Search />
    <SearchStats />
    <Images />
  </div>
);