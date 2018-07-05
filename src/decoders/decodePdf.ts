import * as PDFJSLib from "pdfjs-dist";
import { PDFJS as PDFJSType } from "pdfjs-dist";
import { store } from "../store";
import { create2dContext } from "../misc/decodeWithCanvas";

const PDFJS: typeof PDFJSType = PDFJSLib as any;
// @ts-ignore
PDFJS.GlobalWorkerOptions.workerSrc = `${__dirname}/../../node_modules/pdfjs-dist/build/pdf.worker.min.js`;

/**
 * {@link https://github.com/mozilla/pdf.js}
 */
const decodePdf = async (path: string) => {
  const pdf = await PDFJS.getDocument(path);
  const page = await pdf.getPage(1);

  const viewport = page.getViewport(1);
  const { width, height } = viewport;

  const canvasContext = create2dContext(width, height);
  await page.render({ canvasContext, viewport });

  return canvasContext.getImageData(0, 0, width, height);
};

store.decoders.set(".pdf", decodePdf);
store.decoders.set(".ai", decodePdf);
