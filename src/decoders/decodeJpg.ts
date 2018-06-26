import * as jpeg from "jpeg-js";
import { store } from "../misc/store";
import { readFileAsync } from "../misc/promisified";

/**
 * {@link https://github.com/eugeneware/jpeg-js}
 */
const decodeJpg = async (image: string) => {
  const encoded = await readFileAsync(image);
  const { data, width, height } = jpeg.decode(encoded, true);
  return { data, width, height };
};

store.decoders.set(".jpg", decodeJpg);
store.decoders.set(".jpeg", decodeJpg);
