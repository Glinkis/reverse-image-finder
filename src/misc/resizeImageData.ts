import { ImageBuffer } from "../store";

type ResizeAlgorithm = (src: ImageBuffer, dst: ImageBuffer) => void;

export const resizeImageData = (
  image: ImageBuffer,
  width: number,
  height: number,
  algorithm?: ResizeAlgorithm
) => {
  algorithm = algorithm || bilinearInterpolation;

  const data = new Buffer(width * height * 4);
  const result = { width, height, data };

  algorithm(image, result);

  return result;
};

export const nearestNeighbor: ResizeAlgorithm = (src, dst) => {
  let pos = 0;

  for (let y = 0; y < dst.height; y++) {
    for (let x = 0; x < dst.width; x++) {
      const srcX = Math.floor((x * src.width) / dst.width);
      const srcY = Math.floor((y * src.height) / dst.height);

      let srcPos = (srcY * src.width + srcX) * 4;

      dst.data[pos++] = src.data[srcPos++]; // R
      dst.data[pos++] = src.data[srcPos++]; // G
      dst.data[pos++] = src.data[srcPos++]; // B
      dst.data[pos++] = src.data[srcPos++]; // A
    }
  }
};

export const bilinearInterpolation: ResizeAlgorithm = (src, dst) => {
  let xMin: number;
  let yMin: number;

  let xMax: number;
  let yMax: number;

  // prettier-ignore
  const interpolate = (k: number, kMin: number, kMax: number, vMin: number, vMax: number) => {
    return Math.round((k - kMin) * vMax + (kMax - k) * vMin);
  }

  const interpolateHorizontal = (offset: number, x: number, y: number) => {
    const vMin = src.data[(y * src.width + xMin) * 4 + offset];
    if (xMin === xMax) {
      return vMin;
    }
    const vMax = src.data[(y * src.width + xMax) * 4 + offset];
    return interpolate(x, xMin, xMax, vMin, vMax);
  };

  const interpolateVertical = (offset: number, x: number, y: number) => {
    const vMin = interpolateHorizontal(offset, x, yMin);
    if (yMin === yMax) {
      return vMin;
    }
    const vMax = interpolateHorizontal(offset, x, yMax);
    return interpolate(y, yMin, yMax, vMin, vMax);
  };

  let pos = 0;

  for (let y = 0; y < dst.height; y++) {
    for (let x = 0; x < dst.width; x++) {
      const srcX = (x * src.width) / dst.width;
      const srcY = (y * src.height) / dst.height;

      xMin = Math.floor(srcX);
      yMin = Math.floor(srcY);

      xMax = Math.min(Math.ceil(srcX), src.width - 1);
      yMax = Math.min(Math.ceil(srcY), src.height - 1);

      dst.data[pos++] = interpolateVertical(0, srcX, srcY); // R
      dst.data[pos++] = interpolateVertical(1, srcX, srcY); // G
      dst.data[pos++] = interpolateVertical(2, srcX, srcY); // B
      dst.data[pos++] = interpolateVertical(3, srcX, srcY); // A
    }
  }
};
