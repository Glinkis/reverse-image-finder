import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../misc/store";
import { imageRow } from "./Images";

export const SelectImageFile = () => (
  <button id="select-image-file" onClick={openImage}>
    Select Image
  </button>
);

export const SelectedImageFile = observer(
  () => (store.image ? imageRow(store.image) : null)
);

const openImage = () => {
  store.image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions: store.extensions }],
    properties: ["openFile"]
  })[0];
};
