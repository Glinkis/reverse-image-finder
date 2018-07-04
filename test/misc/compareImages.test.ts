import { expect } from "chai";
import { store } from "../../src/store";
import { compareImages } from "../../src/misc/compareImages";
import * as path from "path";

describe("compareImages", () => {
  async function compareAssets(a: string, b: string) {
    store.threshold = 0.05;
    const assets = path.join(__dirname, "../", "assets");
    return await compareImages(`${assets}/${a}`, `${assets}/${b}`);
  }

  describe("compare same", () => {
    it("returns true for same JPG (16x16)", async () => {
      expect(await compareAssets("img0.jpg", "img0.jpg")).to.be.true;
    });

    it("returns true for same PNG (16x16)", async () => {
      expect(await compareAssets("img0.png", "img0.png")).to.be.true;
    });

    it("returns true for same PSD (16x16)", async () => {
      expect(await compareAssets("img0.psd", "img0.psd")).to.be.true;
    });

    it("returns true for same TIFF (16x16)", async () => {
      expect(await compareAssets("img2.tif", "img2.tif")).to.be.true;
    });
  });

  describe("compare similar", () => {
    it("returns true for similar JPG (16x16)", async () => {
      expect(await compareAssets("img0.jpg", "img1.jpg")).to.be.true;
    });

    it("returns true for similar PNG (16x16)", async () => {
      expect(await compareAssets("img0.png", "img1.png")).to.be.true;
    });

    it("returns true for similar PSD (16x16)", async () => {
      expect(await compareAssets("img0.psd", "img1.psd")).to.be.true;
    });
  });

  describe("compare different", () => {
    it("returns false for different JPG (16x16 & 512x512)", async () => {
      expect(await compareAssets("img0.jpg", "img2.jpg")).to.be.false;
    });

    it("returns false for different PNG (16x16 & 512x512)", async () => {
      expect(await compareAssets("img0.png", "img2.png")).to.be.false;
    });

    it("returns false for different PSD (16x16 & 512x512)", async () => {
      expect(await compareAssets("img0.psd", "img2.psd")).to.be.false;
    });
  });

  describe("compare identical", () => {
    it("returns true for identical JPG to PNG (16x16)", async () => {
      expect(await compareAssets("img0.jpg", "img0.png")).to.be.true;
    });

    it("returns true for identical JPG to PSD (16x16)", async () => {
      expect(await compareAssets("img0.jpg", "img0.psd")).to.be.true;
    });

    it("returns true for identical PNG to PSD (16x16)", async () => {
      expect(await compareAssets("img0.png", "img0.psd")).to.be.true;
    });

    it("returns true for identical TIF to PNG (512x512)", async () => {
      expect(await compareAssets("img2.tif", "img2.png")).to.be.true;
    });

    it("returns true for identical PDF to PNG (32x32)", async () => {
      expect(await compareAssets("img3.pdf", "img3.png")).to.be.true;
    });

    it("returns true for identical AI to PNG (32x32)", async () => {
      expect(await compareAssets("img3.ai", "img3.png")).to.be.true;
    });

    it("returns true for identical SVG to PNG (32x32)", async () => {
      expect(await compareAssets("img3.svg", "img3.png")).to.be.true;
    });
  });
});
