export const decodeWithCanvas = async (image: string) => {
  const img = new Image();

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = image;
  });

  const { data, width, height } = readImageData(img);

  return { data: new Uint8Array(data.buffer), width, height };
};

const readImageData = (image: HTMLImageElement) => {
  const { width, height } = image;
  const context = create2dContext(width, height);
  context.drawImage(image, 0, 0, width, height);
  return context.getImageData(0, 0, width, height);
};

const create2dContext = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d") as CanvasRenderingContext2D;
};
