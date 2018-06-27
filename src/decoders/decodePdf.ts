import * as PDFJSLib from "pdfjs-dist";
import { PDFJS as PDFJSType } from "pdfjs-dist";
import { readFileAsync } from "../misc/promisified";
import { store } from "../misc/store";

const PDFJS: typeof PDFJSType = PDFJSLib as any;
// @ts-ignore
PDFJS.GlobalWorkerOptions.workerSrc = `${__dirname}/../../node_modules/pdfjs-dist/build/pdf.worker.min.js`;

const canvas = document.createElement("canvas");
const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

/**
 * {@link https://github.com/mozilla/pdf.js}
 */
const decodePdf = async (image: string) => {
  const document = await readFileAsync(image);
  const pdf = await PDFJS.getDocument(document);
  const page = await pdf.getPage(1);

  const viewport = page.getViewport(1);
  const { width, height } = viewport;

  canvas.width = width;
  canvas.height = height;

  await page.render({ canvasContext, viewport });
  const imageData = canvasContext.getImageData(0, 0, width, height);

  return { data: new Uint8Array(imageData.data.buffer), width, height };
};

store.decoders.set(".pdf", decodePdf);
store.decoders.set(".ai", decodePdf);
