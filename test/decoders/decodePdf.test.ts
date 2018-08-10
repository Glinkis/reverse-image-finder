import { expect } from "chai";
import * as path from "path";
import { decodeImage } from "../../src/decoders/decodeImage";

const assets = path.join(__dirname, "../", "assets");

describe("decodePdf", () => {
  it("imports PDF file 1 with correct size", async () => {
    const image = await decodeImage(`${assets}/img3.pdf`);
    expect(image.height).equal(32);
    expect(image.width).equal(32);
  });
  it("imports PDF file 2 with correct size", async () => {
    const image = await decodeImage(`${assets}/img4.pdf`);
    expect(image.height).equal(128);
    expect(image.width).equal(64);
  });
  it("imports PDF file 3 with correct size", async () => {
    const image = await decodeImage(`${assets}/img5.pdf`);
    expect(image.height).equal(64);
    expect(image.width).equal(128);
  });
});
