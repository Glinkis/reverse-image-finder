import { store } from "../store";

/**
 * Array with all the supported format extensions.
 */
export const extensions = [...store.decoders.keys()].map(key =>
  key.substring(1, key.length)
);
