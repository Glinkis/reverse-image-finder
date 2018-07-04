import { store } from "../store";
import { decodeWithCanvas } from "../misc/decodeWithCanvas";

const decodeJpg = (image: string) => decodeWithCanvas(image);

store.decoders.set(".jpg", decodeJpg);
store.decoders.set(".jpeg", decodeJpg);
