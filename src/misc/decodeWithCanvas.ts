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
  const ctx = create2dContext(image.width, image.height);
  ctx.drawImage(image, 0, 0, image.width, image.height);
  return ctx.getImageData(0, 0, image.width, image.height);
};

export const create2dContext = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d") as CanvasRenderingContext2D;
};
