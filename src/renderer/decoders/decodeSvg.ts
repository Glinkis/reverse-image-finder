import { decodeWithSharp } from "../misc/decodeWithSharp";
import { store } from "../store";

const decodeSvg = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".svg", decodeSvg);
