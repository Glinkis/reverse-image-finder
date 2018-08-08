import { store } from "../store";
import { decodeWithSharp } from "../misc/decodeWithSharp";

const decodeSvg = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".svg", decodeSvg);
