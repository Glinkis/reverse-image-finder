import { store } from "../misc/store";

const canvas = document.createElement("canvas");

const decodeSvg = async (image: string) => {
  const img = new Image();

  await new Promise(res => {
    img.onload = () => res();
    img.src = image;
  });

  const { width, height } = img;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);

  return { data: new Uint8Array(data.buffer), width, height };
};

store.decoders.set(".svg", decodeSvg);
