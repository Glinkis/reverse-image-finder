import { shell } from "electron";
import { observer } from "mobx-react";
import * as React from "react";
import { store } from "../store";

export const Images = observer(() => <div>{store.images.map(imageRow)}</div>);

export const imageRow = (image: string, i?: number) => (
  <a key={i} href="#" onClick={() => shell.showItemInFolder(image)}>
    {image}
  </a>
);
