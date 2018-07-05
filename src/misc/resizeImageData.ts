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

// prettier-ignore
export const bilinearInterpolation: ResizeAlgorithm = (src, dst) => {
  type n = number;

  const interpolate = (k: n, kMin: n, kMax: n, vMin: n, vMax: n) => {
    return Math.round((k - kMin) * vMax + (kMax - k) * vMin);
  }

  const interpolateHorizontal = (offset: n, x: n, y: n, xMin: n, xMax: n) => {
    const vMin = src.data[(y * src.width + xMin) * 4 + offset];
    if (xMin === xMax) {
      return vMin;
    }
    const vMax = src.data[(y * src.width + xMax) * 4 + offset];
    return interpolate(x, xMin, xMax, vMin, vMax);
  }

  const interpolateVertical = (offset: n, x: n, xMin: n, xMax: n, y: n, yMin: n, yMax: n) => {
    const vMin = interpolateHorizontal(offset, x, yMin, xMin, xMax);
    if (yMin === yMax) {
      return vMin;
    }
    const vMax = interpolateHorizontal(offset, x, yMax, xMin, xMax);
    return interpolate(y, yMin, yMax, vMin, vMax);
  }

  let pos = 0;

  for (let y = 0; y < dst.height; y++) {
    for (let x = 0; x < dst.width; x++) {
      const srcX = (x * src.width) / dst.width;
      const srcY = (y * src.height) / dst.height;

      const xMin = Math.floor(srcX);
      const yMin = Math.floor(srcY);

      const xMax = Math.min(Math.ceil(srcX), src.width - 1);
      const yMax = Math.min(Math.ceil(srcY), src.height - 1);

      dst.data[pos++] = interpolateVertical(0, srcX, xMin, xMax, srcY, yMin, yMax) // R
      dst.data[pos++] = interpolateVertical(1, srcX, xMin, xMax, srcY, yMin, yMax) // G
      dst.data[pos++] = interpolateVertical(2, srcX, xMin, xMax, srcY, yMin, yMax) // B
      dst.data[pos++] = interpolateVertical(3, srcX, xMin, xMax, srcY, yMin, yMax) // A
    }
  }
}
