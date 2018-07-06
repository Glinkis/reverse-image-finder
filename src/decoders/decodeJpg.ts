import { store } from "../store";
import { decodeWithCanvas } from "../misc/decodeWithCanvas";

const decodeJpg = (imagePath: string) => decodeWithCanvas(imagePath);

store.decoders.set(".jpg", decodeJpg);
store.decoders.set(".jpeg", decodeJpg);
