import * as React from "react";
import * as path from "path";
import { observer } from "mobx-react";
import { store } from "../store";
import { shell } from "electron";

export const Images = observer(() => <div>{store.images.map(imageRow)}</div>);

export const imageRow = (image: string, i?: number) => (
  <a key={i} href="#" onClick={() => shell.showItemInFolder(image)}>
    {path.basename(image)}
  </a>
);
