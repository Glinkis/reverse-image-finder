import * as React from "react";
import { emptyIndexedPixelData } from "../misc/io";

export const ClearIndexed = () => (
  <button onClick={emptyIndexedPixelData}>Clear Indexed Files</button>
);
