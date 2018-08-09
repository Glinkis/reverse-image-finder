import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../store";
import { imageRow } from "./Images";
import { extensions } from "../decoders/decodeImage";
import { getImage } from "../misc/compareImages";

export const SelectImageFile = () => (
  <div>
    <button onClick={openImage}>Select Image</button>
    <br />
    Supported formats:
    {extensions.map(ext => (
      <b key={ext}> {`.${ext}`} </b>
    ))}
  </div>
);

export const SelectedImageFile = observer(() => {
  if (!store.image) return null;
  return imageRow(store.image);
});

const openImage = () => {
  const image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions }],
    properties: ["openFile"]
  });
  if (image) {
    store.image = image[0];
    getImage(store.image);
  }
};
