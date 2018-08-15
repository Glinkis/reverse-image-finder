import { remote } from "electron";
import { observer } from "mobx-react";
import * as React from "react";
import { extensions } from "../misc/extensions";
import { getIndexedImage } from "../misc/getImage";
import { store } from "../store";
import { imageRow } from "./Images";

export const SelectImageFile = () => (
  <button onClick={openImage}>Select Image</button>
);

export const SelectedImageFile = observer(() => {
  if (store.image) {
    return imageRow(store.image);
  }
  return null;
});

const openImage = () => {
  const image = remote.dialog.showOpenDialog({
    filters: [{ extensions, name: "Image" }],
    properties: ["openFile"],
    title: "Select Image"
  });

  if (image) {
    store.image = image[0];
    getIndexedImage(store.image);
  }
};
