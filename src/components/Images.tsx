import * as React from "react";
import { observer } from "mobx-react";
import { store } from "../misc/store";
import { shell } from "electron";

export const Images = observer(() => {
  return <div>{store.images.map(imageRow)}</div>;
});

const imageRow = (image: string, i: number) => {
  const onClick = () => shell.showItemInFolder(image);
  return (
    <div key={i}>
      <a href="#" onClick={onClick}>
        {image}
      </a>
    </div>
  );
};
