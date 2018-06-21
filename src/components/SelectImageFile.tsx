import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../misc/store";
import * as path from "path";
import { parseImage, resizeImage } from "../misc/compareImages";

export const SelectImageFile = () => (
  <button id="select-image-file" onClick={openImage}>
    Select Image
  </button>
);

export const SelectedImageFile = observer(() => (
  <div id="selected-image-file">
    {store.image ? <img src={store.image} width="75px" /> : null}
    {store.image ? <span>{path.basename(store.image)}</span> : null}
  </div>
));

const openImage = async () => {
  store.image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions: store.extensions }],
    properties: ["openFile"]
  })[0];

  store.imageData = await resizeImage(store.image);
};
