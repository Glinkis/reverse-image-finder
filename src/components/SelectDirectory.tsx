import * as React from "react";
import { remote } from "electron";

const openDirectory = () => {
  return remote.dialog.showOpenDialog({
    title: "Select Directory",
    properties: ["openDirectory"]
  })[0];
};

export const SelectDirectory = () => (
  <button onClick={openDirectory}>Directory</button>
);
