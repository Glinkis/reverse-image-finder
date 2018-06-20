import * as React from "react";
import { remote } from "electron";

const openImage = () => {
  return remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions: ["png"] }],
    properties: ["openFile"]
  })[0];
};

export const SelectImageFile = () => (
  <button onClick={openImage}>Select Image</button>
);
