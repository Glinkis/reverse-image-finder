import * as PDFJSLib from "pdfjs-dist";
import { PDFJS as PDFJSType } from "pdfjs-dist";
import { store } from "../store";

// Fix incorrect typing.
const PDFJS: typeof PDFJSType = PDFJSLib as any;

try {
  const pdfWorkerSrc = require("file-loader?name=[name].[ext]!../../node_modules/pdfjs-dist/build/pdf.worker.min.js");
  // @ts-ignore
  PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
} catch {
  // @ts-ignore
  PDFJS.GlobalWorkerOptions.workerSrc = `${__dirname}/../../node_modules/pdfjs-dist/build/pdf.worker.min.js`;
}

/**
 * {@link https://github.com/mozilla/pdf.js}
 */
const decodePdf = async (imagePath: string) => {
  const pdf = await PDFJS.getDocument(imagePath);
  const page = await pdf.getPage(1);

  const viewport = page.getViewport(1);
  const { width, height } = viewport;

  const canvasContext = create2dContext(width, height);
  await page.render({ canvasContext, viewport });

  return canvasContext.getImageData(0, 0, width, height);
};

const create2dContext = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d") as CanvasRenderingContext2D;
};

store.decoders.set(".pdf", decodePdf);
store.decoders.set(".ai", decodePdf);
