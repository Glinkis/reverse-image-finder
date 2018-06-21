import * as React from "react";
import { observer } from "mobx-react";
import { store, IFile } from "../misc/store";
import { shell } from "electron";

export const SimilarImages = observer(() => (
  <div>{store.similarImages.map(similarImage)}</div>
));

const similarImage = (item: IFile, i: number) => (
  <div key={i}>
    <img src={item.path} />
    <a href="#" onClick={() => openItem(item)}>
      {item.path}
    </a>
  </div>
);

export const openItem = item => {
  console.log(item);
  shell.showItemInFolder(store.image);
};
