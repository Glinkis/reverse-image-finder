import { store } from "../store";
import { decodeWithCanvas } from "../misc/decodeWithCanvas";

const decodeSvg = (imagePath: string) => decodeWithCanvas(imagePath);

store.decoders.set(".svg", decodeSvg);
