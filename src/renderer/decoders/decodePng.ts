import { decodeWithSharp } from "../misc/decodeWithSharp";
import { store } from "../store";

export const decodePng = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".png", decodeWithSharp);
