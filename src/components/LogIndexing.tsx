import { observer } from "mobx-react";
import * as React from "react";
import { store } from "../store";

export const LogIndexing = observer(() => {
  const onChange = () => {
    store.logIndexing = !store.logIndexing;
  };

  return (
    <div>
      Log indexing:
      <input type="checkbox" checked={store.logIndexing} onChange={onChange} />
    </div>
  );
});
