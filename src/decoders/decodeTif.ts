import { store } from "../store";
import { decodeWithSharp } from "../misc/decodeWithSharp";

const decodeTif = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".tif", decodeTif);
store.decoders.set(".tiff", decodeTif);
