import * as React from "react";
import { remote } from "electron";
import { observable } from "mobx";
import { observer } from "mobx-react";

const store = observable({
  directory: null
});

const openDirectory = () => {
  store.directory = remote.dialog.showOpenDialog({
    title: "Select Directory",
    properties: ["openDirectory"]
  })[0];
};

export const SelectDirectory = () => (
  <button onClick={openDirectory}>Directory</button>
);

export const SelectedDirectory = observer(() => <div>{store.directory}</div>);
