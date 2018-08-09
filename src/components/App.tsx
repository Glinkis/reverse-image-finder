import * as React from "react";
import { ClearIndexed } from "./ClearIndexed";
import { Images } from "./Images";
import { LogIndexing } from "./LogIndexing";
import { OpenIndexedDirectory } from "./OpenIndexedDirectory";
import { Search } from "./Search";
import { SearchStats } from "./SearchStats";
import { SelectDirectory, SelectedDirectory } from "./SelectDirectory";
import { SelectedImageFile, SelectImageFile } from "./SelectImageFile";
import { SupportedFormats } from "./SupportedFormats";
import { Threshold } from "./Threshold";

export const App = () => (
  <div id="app">
    <div id="left">
      <SupportedFormats />
      <SelectImageFile />
      <SelectedImageFile />
      <SelectDirectory />
      <SelectedDirectory />
      <OpenIndexedDirectory />
      <ClearIndexed />
      <LogIndexing />
      <Threshold />
      <Search />
      <SearchStats />
    </div>
    <div id="right">
      <Images />
    </div>
  </div>
);
