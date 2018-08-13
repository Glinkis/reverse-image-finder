import * as path from "path";

export const indexSize = 64;

export const root = path.join(__dirname, "../../../");

export const assets = path.join(root, "assets");

export const pdfWorker = path.join(root, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.js"); // prettier-ignore
