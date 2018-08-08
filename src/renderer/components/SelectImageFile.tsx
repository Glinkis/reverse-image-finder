import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../store";
import { imageRow } from "./Images";
import { extensions } from "../decoders/decodeImage";

export const SelectImageFile = () => (
  <div>
    <button onClick={openImage}>Select Image</button>
    <br />
    Supported formats:
    {extensions.map(ext => <b key={ext}> {`.${ext}`} </b>)}
  </div>
);

export const SelectedImageFile = observer(() => {
  if (!store.image) return null;
  return imageRow(store.image, 0);
});

const openImage = () => {
  store.image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions }],
    properties: ["openFile"]
  })[0];
};
