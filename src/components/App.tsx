import * as React from "react";
import { SelectDirectory, SelectedDirectory } from "./SelectDirectory";
import { SelectImageFile, SelectedImageFile } from "./SelectImageFile";
import { Search } from "./Search";
import { Images } from "./Images";
import { Threshold } from "./Threshold";
import { ClearIndexed } from "./ClearIndexed";
import { SearchStats } from "./SearchStats";
import { OpenIndexedDirectory } from "./OpenIndexedDirectory";
import { LogIndexing } from "./LogIndexing";
import { SupportedFormats } from "./SupportedFormats";

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
