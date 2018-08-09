import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../store";

export const SelectDirectory = () => (
  <button onClick={openDirectory}>Directory</button>
);

export const SelectedDirectory = observer(() => <div>{store.directory}</div>);

const openDirectory = () => {
  const directory = remote.dialog.showOpenDialog({
    title: "Select Directory",
    properties: ["openDirectory"]
  });
  if (directory) {
    store.directory = directory[0];
  }
};
