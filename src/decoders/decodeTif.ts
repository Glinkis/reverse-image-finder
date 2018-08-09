import { decodeWithSharp } from "../misc/decodeWithSharp";
import { store } from "../store";

const decodeTif = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".tif", decodeTif);
store.decoders.set(".tiff", decodeTif);
