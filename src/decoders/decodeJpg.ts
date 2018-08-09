import { decodeWithSharp } from "../misc/decodeWithSharp";
import { store } from "../store";

const decodeJpg = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".jpg", decodeJpg);
store.decoders.set(".jpeg", decodeJpg);
