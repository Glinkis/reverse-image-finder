import { remote } from "electron";
import { observer } from "mobx-react";
import * as React from "react";
import { extensions } from "../decoders/decodeImage";
import { getImage } from "../misc/compareImages";
import { store } from "../store";
import { imageRow } from "./Images";

export const SelectImageFile = () => (
  <button onClick={openImage}>Select Image</button>
);

export const SelectedImageFile = observer(() => {
  if (!store.image) {
    return null;
  }
  return imageRow(store.image);
});

const openImage = () => {
  const image = remote.dialog.showOpenDialog({
    filters: [{ extensions, name: "Image" }],
    properties: ["openFile"],
    title: "Select Image"
  });
  if (image) {
    store.image = image[0];
    getImage(store.image);
  }
};
