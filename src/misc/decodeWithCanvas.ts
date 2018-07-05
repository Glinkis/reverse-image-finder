import { typedArrayToBuffer } from "./typedArrayToBuffer";

export const decodeWithCanvas = async (path: string) => {
  const img = new Image();

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = path;
  });

  return readImageData(img);
};

const readImageData = (image: HTMLImageElement) => {
  const { width, height } = image;
  const context = create2dContext(width, height);
  context.drawImage(image, 0, 0, width, height);
  const { data } = context.getImageData(0, 0, width, height);
  return { data: typedArrayToBuffer(data), width, height };
};

export const create2dContext = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d") as CanvasRenderingContext2D;
};
