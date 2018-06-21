import * as React from "react";
import { observer } from "mobx-react";
import { store } from "../misc/store";

export const Threshold = observer(
  () =>
    store.directory && store.image ? (
      <div>
        <div>Threshold: {store.threshold}</div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={store.threshold}
          onChange={e => (store.threshold = Number((e.target as any).value))}
        />
      </div>
    ) : null
);
