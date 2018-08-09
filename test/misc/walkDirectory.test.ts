import { expect } from "chai";
import * as path from "path";
import { checkFileSupport } from "../../src/misc/searchForFiles";
import { walkDirectory } from "../../src/misc/walkDirectory";
import { store } from "../../src/store";

const assets = path.join(__dirname, "../", "assets");

describe("walkDirectory", () => {
  it("finds a deeply nested image", async () => {
    const files: string[] = [];
    store.isSearching = true;
    await walkDirectory(
      assets,
      file => {
        files.push(file);
      },
      checkFileSupport
    );
    store.isSearching = false;
    const names = files.map(file => path.basename(file));
    expect(names).contains("img-deep.png");
  });
});
