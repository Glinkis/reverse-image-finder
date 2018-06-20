import * as React from "react";
import { remote } from "electron";

const openDirectory = () => {
  remote.dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
};

export const SelectDirectory = () => (
  <button onClick={openDirectory}>Directory</button>
);
