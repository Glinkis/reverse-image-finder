import { remote, shell } from "electron";
import { observer } from "mobx-react";
import * as React from "react";
import { store } from "../store";

export const SelectDirectory = () => (
  <button onClick={openDirectory}>Select Directory</button>
);

export const SelectedDirectory = observer(() => (
  <a href="#" onClick={() => shell.showItemInFolder(store.directory as string)}>
    {store.directory}
  </a>
));

const openDirectory = () => {
  const directory = remote.dialog.showOpenDialog({
    properties: ["openDirectory"],
    title: "Select Directory"
  });
  if (directory) {
    store.directory = directory[0];
  }
};
