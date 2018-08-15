import * as React from "react";
import { extensions } from "../misc/extensions";

export const SupportedFormats = () => (
  <div>
    Supported formats:
    {extensions.map(ext => (
      <b key={ext}> {`.${ext}`} </b>
    ))}
  </div>
);
