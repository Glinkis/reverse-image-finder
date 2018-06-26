import * as React from "react";
import { remote } from "electron";
import { observer } from "mobx-react";
import { store } from "../misc/store";
import { imageRow } from "./Images";
import "../decoders/decoders";

const extensions = [...store.decoders.keys()].map(key =>
  key.substring(1, key.length)
);

export const SelectImageFile = () => (
  <div>
    <button onClick={openImage}>Select Image</button>
    <div>
      Supported formats: {extensions.map(ext => <b key={ext}> {`.${ext}`} </b>)}
    </div>
  </div>
);

export const SelectedImageFile = observer(() => {
  if (!store.image) return null;
  return imageRow(store.image);
});

const openImage = () => {
  store.image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions }],
    properties: ["openFile"]
  })[0];
};
