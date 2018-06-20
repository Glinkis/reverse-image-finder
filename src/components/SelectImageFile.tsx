import * as React from "react";
import { remote } from "electron";

const openFile = () => {
  remote.dialog.showOpenDialog({
    properties: ["openFile"]
  });
};

export const SelectImageFile = () => (
  <button onClick={openFile}>Select Image</button>
);
