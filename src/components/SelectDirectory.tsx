import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../misc/store";

export const SelectDirectory = () => (
  <button onClick={openDirectory}>Directory</button>
);

export const SelectedDirectory = observer(() => <div>{store.directory}</div>);

const openDirectory = () => {
  store.directory = remote.dialog.showOpenDialog({
    title: "Select Directory",
    properties: ["openDirectory"]
  })[0];
};
