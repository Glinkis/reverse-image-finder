import * as React from "react";
import { clearIndexedImages } from "../io/clearIndexedImages";

export const ClearIndexed = () => (
  <button onClick={clearIndexedImages}>Clear Indexed Files</button>
);
