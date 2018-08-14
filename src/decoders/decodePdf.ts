import * as PDFJSLib from "pdfjs-dist";
import { PDFJS as PDFJSType } from "pdfjs-dist";
import { indexSize } from "../consts";
import { store } from "../store";

// Fix incorrect typing.
const PDFJS: typeof PDFJSType = PDFJSLib as any;

try {
  // @ts-ignore
  // tslint:disable
  PDFJS.GlobalWorkerOptions.workerSrc = require("file-loader?name=[name].[ext]!../../node_modules/pdfjs-dist/build/pdf.worker.min.js");
} catch {
  // @ts-ignore
  PDFJS.GlobalWorkerOptions.workerSrc = `${__dirname}/../../node_modules/pdfjs-dist/build/pdf.worker.min.js`;
}

/**
 * {@link https://github.com/mozilla/pdf.js}
 */
export const decodePdf = async (imagePath: string) => {
  const pdf = await PDFJS.getDocument(imagePath);
  const page = await pdf.getPage(1);
  let viewport = page.getViewport(1);

  const { width, height } = viewport;

  let canvasWidth = width;
  let canvasHeight = height;

  if (width > indexSize || height > indexSize) {
    let scale = 1;
    canvasWidth = indexSize;
    canvasHeight = indexSize;

    if (height > width) {
      scale = canvasWidth / width;
      canvasHeight = height * scale;
    }

    if (width > height) {
      scale = canvasHeight / height;
      canvasWidth = width * scale;
    }

    viewport = page.getViewport(scale);
  }

  const canvasContext = create2dContext(canvasWidth, canvasHeight);
  await page.render({ canvasContext, viewport });
  const imageData = canvasContext.getImageData(0, 0, canvasWidth, canvasHeight);

  return Object.assign(imageData, { channels: 4 });
};

const create2dContext = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d") as CanvasRenderingContext2D;
};

store.decoders.set(".pdf", decodePdf);
store.decoders.set(".ai", decodePdf);
