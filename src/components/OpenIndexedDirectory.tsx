import { shell } from "electron";
import * as React from "react";
import { getIndexDir } from "../io/getIndexDir";

export const OpenIndexedDirectory = () => (
  <button onClick={() => shell.showItemInFolder(getIndexDir() + "/")}>
    Open Indexed Folder
  </button>
);
