import { expect } from "chai";
import { store } from "../../src/misc/store";
import { compareImages } from "../../src/misc/compareImages";
import * as path from "path";

describe("compareImages", () => {
  async function compareAssets(a: string, b: string) {
    store.threshold = 0.05;
    const assets = path.join(__dirname, "../", "assets");
    return await compareImages(`${assets}/${a}`, `${assets}/${b}`);
  }

  describe("compare same", () => {
    it("returns true for same JPG", async () => {
      expect(await compareAssets("img0.jpg", "img0.jpg")).to.be.true;
    });

    it("returns true for same PNG", async () => {
      expect(await compareAssets("img0.png", "img0.png")).to.be.true;
    });

    it("returns true for same PSD", async () => {
      expect(await compareAssets("img0.psd", "img0.psd")).to.be.true;
    });

    it("returns true for same TIFF", async () => {
      expect(await compareAssets("img2.tif", "img2.tif")).to.be.true;
    });
  });

  describe("compare similar", () => {
    it("returns true for similar JPG", async () => {
      expect(await compareAssets("img0.jpg", "img1.jpg")).to.be.true;
    });

    it("returns true for similar PNG", async () => {
      expect(await compareAssets("img0.png", "img1.png")).to.be.true;
    });

    it("returns true for similar PSD", async () => {
      expect(await compareAssets("img0.psd", "img1.psd")).to.be.true;
    });
  });

  describe("compare different", () => {
    it("returns false for different JPG", async () => {
      expect(await compareAssets("img0.jpg", "img2.jpg")).to.be.false;
    });

    it("returns false for different PNG", async () => {
      expect(await compareAssets("img0.png", "img2.png")).to.be.false;
    });

    it("returns false for different PSD", async () => {
      expect(await compareAssets("img0.psd", "img2.psd")).to.be.false;
    });
  });

  describe("compare identical JPG to PNG", () => {
    it("returns true for identical JPG to PNG", async () => {
      expect(await compareAssets("img0.jpg", "img0.png")).to.be.true;
    });

    it("returns true for identical JPG to PSD", async () => {
      expect(await compareAssets("img0.jpg", "img0.psd")).to.be.true;
    });

    it("returns true for identical PNG to PSD", async () => {
      expect(await compareAssets("img0.png", "img0.psd")).to.be.true;
    });

    it("returns true for identical TIF to PNG", async () => {
      expect(await compareAssets("img2.tif", "img2.png")).to.be.true;
    });

    it("returns true for identical PDF to PNG", async () => {
      expect(await compareAssets("img3.pdf", "img3.png")).to.be.true;
    });

    it("returns true for identical AI to PNG", async () => {
      expect(await compareAssets("img3.ai", "img3.png")).to.be.true;
    });
  });
});
