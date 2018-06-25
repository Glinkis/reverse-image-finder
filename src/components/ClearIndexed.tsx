import * as React from "react";
import { clearPixelData } from "../misc/io";

export const ClearIndexed = () => (
  <button onClick={clearPixelData}>Clear Indexed Files</button>
);
