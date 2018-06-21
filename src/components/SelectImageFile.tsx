import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../misc/store";
import * as path from "path";

export const SelectImageFile = () => (
  <button id="select-image-file" onClick={openImage}>
    Select Image
  </button>
);

export const SelectedImageFile = observer(() => (
  <div id="selected-image-file">
    {store.image ? <span>{path.basename(store.image)}</span> : null}
  </div>
));

const openImage = () => {
  store.image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions: store.extensions }],
    properties: ["openFile"]
  })[0];
};
