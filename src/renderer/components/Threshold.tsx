import { observer } from "mobx-react";
import * as React from "react";
import { store } from "../store";

export const Threshold = observer(() => {
  if (!store.directory || !store.image) {
    return null;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.threshold = Number(e.target.value) ** (2 ** 2);
  };

  return (
    <div>
      Threshold: {store.threshold.toPrecision(2)} <br />
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={Math.sqrt(Math.sqrt(store.threshold))}
        onChange={onChange}
      />
    </div>
  );
});
