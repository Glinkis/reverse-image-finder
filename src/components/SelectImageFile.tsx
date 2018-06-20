import * as React from "react";
import { remote } from "electron";
import { observable } from "mobx";
import { observer } from "mobx-react";

const store = observable({
  image: null
});

const openImage = () => {
  store.image = remote.dialog.showOpenDialog({
    title: "Select Image",
    filters: [{ name: "Image", extensions: ["png", "jpg", "jpeg"] }],
    properties: ["openFile"]
  })[0];
};

export const SelectImageFile = () => (
  <button onClick={openImage}>Select Image</button>
);

export const SelectedImageFile = observer(() => (
  <div>{store.image && store.image.split("\\").reverse()[0]}</div>
));
