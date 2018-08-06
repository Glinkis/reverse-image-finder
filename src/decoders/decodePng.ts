import { store } from "../store";
import { decodeWithSharp } from "../misc/decodeWithSharp";

export const decodePng = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".png", decodeWithSharp);
