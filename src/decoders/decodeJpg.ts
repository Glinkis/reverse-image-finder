import * as jpeg from "jpeg-js";
import { store } from "../misc/store";
import { readFileAsync } from "../misc/promisified";

/**
 * {@link https://github.com/eugeneware/jpeg-js}
 */
const decodeJpg = async (image: string) => {
  const encoded = await readFileAsync(image);
  return jpeg.decode(encoded, true);
};

store.decoders.set(".jpg", decodeJpg);
store.decoders.set(".jpeg", decodeJpg);
