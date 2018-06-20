import { SelectDirectory, SelectedDirectory } from "./SelectDirectory";
import { SelectImageFile, SelectedImageFile } from "./SelectImageFile";
import * as React from "react";

export const App = () => (
  <div>
    <SelectImageFile />
    <SelectedImageFile />
    <SelectDirectory />
    <SelectedDirectory />
  </div>
);
