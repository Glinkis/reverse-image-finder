import { SelectDirectory } from "./SelectDirectory";
import { SelectImageFile } from "./SelectImageFile";
import * as React from "react";

export const App = () => (
  <div>
    <SelectImageFile />
    <SelectDirectory />
  </div>
);
