import * as React from "react";
import { extensions } from "../decoders/decodeImage";

export const SupportedFormats = () => (
  <div>
    Supported formats:
    {extensions.map(ext => (
      <b key={ext}> {`.${ext}`} </b>
    ))}
  </div>
);
