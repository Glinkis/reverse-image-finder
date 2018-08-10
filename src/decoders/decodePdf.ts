import * as PDFJSLib from "pdfjs-dist";
import { PDFJS as PDFJSType } from "pdfjs-dist";
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

const MAX_SMALLEST_AXIS = 64;

/**
 * {@link https://github.com/mozilla/pdf.js}
 */
const decodePdf = async (imagePath: string) => {
  const pdf = await PDFJS.getDocument(imagePath);
  const page = await pdf.getPage(1);
  let viewport = page.getViewport(1);

  const { width, height } = viewport;
  let canvasWidth = width;
  let canvasHeight = height;

  if (width > MAX_SMALLEST_AXIS || height > MAX_SMALLEST_AXIS) {
    let scale = 1;
    canvasWidth = MAX_SMALLEST_AXIS;
    canvasHeight = MAX_SMALLEST_AXIS;

    if (height > width) {
      scale = canvasWidth / width;
      canvasHeight = height * scale;
    }

    if (width > height) {
      scale = canvasHeight / height;
      canvasWidth = width * scale;
    }

    viewport = viewport.clone({ scale } as any);
  }

  const canvasContext = create2dContext(canvasWidth, canvasHeight);
  await page.render({ canvasContext, viewport });
  return canvasContext.getImageData(0, 0, canvasWidth, canvasHeight);
};

const create2dContext = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d") as CanvasRenderingContext2D;
};

store.decoders.set(".pdf", decodePdf);
store.decoders.set(".ai", decodePdf);
