import { store } from "../store";
import { decodeWithCanvas } from "../misc/decodeWithCanvas";

const decodeSvg = async (image: string) => {
  return decodeWithCanvas(image);
};

store.decoders.set(".svg", decodeSvg);
