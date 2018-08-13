import * as path from "path";
import { store } from "../store";

export const checkFileSupport = (file: string) => {
  return store.decoders.has(path.extname(file).toLowerCase());
};
