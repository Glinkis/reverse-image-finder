import * as React from "react";
import { observer } from "mobx-react";
import { store } from "../misc/store";

export const Threshold = observer(
  () =>
    store.directory && store.image ? (
      <div>
        <div>Threshold: {store.threshold.toPrecision(2)}</div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={Math.sqrt(Math.sqrt(store.threshold))}
          onChange={e =>
            (store.threshold = (e.target as any).value ** (2 ** 2))
          }
        />
      </div>
    ) : null
);
