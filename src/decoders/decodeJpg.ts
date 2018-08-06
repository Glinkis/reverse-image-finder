import { store } from "../store";
import { decodeWithSharp } from "../misc/decodeWithSharp";

const decodeJpg = (imagePath: string) => decodeWithSharp(imagePath);

store.decoders.set(".jpg", decodeJpg);
store.decoders.set(".jpeg", decodeJpg);
