import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../misc/store";
import { imageRow } from "./Images";

export const SelectImageFile = () => (
  <button onClick={openImage}>Select Image</button>
);

export const SelectedImageFile = observer(() => {
  if (!store.image) return null;
  return imageRow(store.image);
});

const openImage = () => {
  store.image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions: [...store.decoders.keys()] }],
    properties: ["openFile"]
  })[0];
};
