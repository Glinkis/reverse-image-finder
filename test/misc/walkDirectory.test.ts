import { expect } from "chai";
import { walkDirectory } from "../../src/renderer/misc/walkDirectory";
import { checkFileSupport } from "../../src/renderer/misc/searchForFiles";
import * as path from "path";

const assets = path.join(__dirname, "../", "assets");

describe("walkDirectory", () => {
  it("finds a deeply nested image", async () => {
    const files = await walkDirectory(assets, checkFileSupport);
    const names = files.map(file => path.basename(file));
    expect(names).contains("img-deep.png");
  });
});
