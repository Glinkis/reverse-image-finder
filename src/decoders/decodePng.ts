import { store } from "../store";
import { decodeWithSharp } from "../misc/decodeWithSharp";

/**
 * {@link https://github.com/lukeapage/pngjs}
 */
export const decodePng = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".png", decodePng);
