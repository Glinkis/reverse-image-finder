import * as jpeg from "jpeg-js";
import { store } from "../misc/store";
import { readFileAsync } from "../misc/promisified";

const decodeJpg = async (image: string) => {
  const encoded = await readFileAsync(image);
  const { data, width, height } = jpeg.decode(encoded, true);
  return { data, width, height };
};

store.decoders.push(
  { ext: "jpg", decode: decodeJpg },
  { ext: "jpeg", decode: decodeJpg }
);
