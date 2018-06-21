import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../misc/store";

export const SelectImageFile = () => (
  <button id="select-image-file" onClick={openImage}>
    Select Image
  </button>
);

export const SelectedImageFile = observer(() => (
  <div id="selected-image-file">
    {store.image ? <img src={store.image} /> : null}
    {store.image ? <span>{store.image.split("\\").reverse()[0]}</span> : null}
  </div>
));

const openImage = () => {
  store.image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions: ["png", "jpg", "jpeg", "tif"] }],
    properties: ["openFile"]
  })[0];
};
