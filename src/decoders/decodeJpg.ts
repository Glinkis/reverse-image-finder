import { store } from "../misc/store";
import { decodeWithCanvas } from "../misc/decodeWithCanvas";

/**
 * {@link https://github.com/eugeneware/jpeg-js}
 */
const decodeJpg = (image: string) => {
  return decodeWithCanvas(image);
};

store.decoders.set(".jpg", decodeJpg);
store.decoders.set(".jpeg", decodeJpg);
