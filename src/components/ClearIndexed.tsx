import * as React from "react";
import { clearIndexedImages } from "../misc/io";

export const ClearIndexed = () => (
  <button onClick={clearIndexedImages}>Clear Indexed Files</button>
);
