import * as React from "react";
import { shell } from "electron";
import { store } from "../store";

export const OpenIndexedDirectory = () => (
  <button onClick={() => shell.showItemInFolder(store.indexedDir + "/")}>
    Open Indexed Folder
  </button>
);
