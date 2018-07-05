import { expect } from "chai";
import {
  resizeImageData,
  bilinearInterpolation,
  nearestNeighbor
} from "../../src/misc/resizeImageData";

describe("resizeImageData", () => {
  // prettier-ignore
  const pixels = new Buffer([
    255, 0, 0, 0,/**/ 0, 255, 0, 0,
    /*****************************/
    0, 0, 255, 0,/**/ 0, 0, 0, 255
  ]);
  const image = { data: pixels, width: 2, height: 2 };

  it("resizes with bilinearInterpolation", () => {
    // prettier-ignore
    const pixels = new Buffer([
      255, 0, 0, 0,  /**/ 128, 128, 0, 0,/**/ 0, 255, 0, 0,  /**/ 0, 255, 0, 0,
      /*************************************************************************/      
      128, 0, 128, 0,/**/ 64, 64, 64, 64,/**/ 0, 128, 0, 128,/**/ 0, 128, 0, 128,
      /*************************************************************************/
      0, 0, 255, 0,  /**/ 0, 0, 128, 128,/**/ 0, 0, 0, 255,  /**/ 0, 0, 0, 255,
      /*************************************************************************/
      0, 0, 255, 0,  /**/ 0, 0, 128, 128,/**/ 0, 0, 0, 255,  /**/ 0, 0, 0, 255,
    ]);
    const data = resizeImageData(image, 4, 4, bilinearInterpolation);
    expect(data).to.deep.equal(pixels);
  });

  it("resizes with nearestNeighbour", () => {
    // prettier-ignore
    const pixels = new Buffer([
      255, 0, 0, 0,/**/ 255, 0, 0, 0,/**/ 0, 255, 0, 0,/**/ 0, 255, 0, 0,
      /*****************************************************************/
      255, 0, 0, 0,/**/ 255, 0, 0, 0,/**/ 0, 255, 0, 0,/**/ 0, 255, 0, 0,
      /*****************************************************************/
      0, 0, 255, 0,/**/ 0, 0, 255, 0,/**/ 0, 0, 0, 255,/**/ 0, 0, 0, 255,
      /*****************************************************************/
      0, 0, 255, 0,/**/ 0, 0, 255, 0,/**/ 0, 0, 0, 255,/**/ 0, 0, 0, 255,
    ]);
    const data = resizeImageData(image, 4, 4, nearestNeighbor);
    expect(data).to.deep.equal(pixels);
  });
});
