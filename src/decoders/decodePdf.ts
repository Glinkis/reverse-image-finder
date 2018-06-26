import { PDFJS } from "pdfjs-dist";
import { readFileAsync } from "../misc/promisified";

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

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({ canvasContext, viewport });

  return canvasContext.getImageData(0, 0, viewport.height, viewport.width);
};
