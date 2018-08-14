import { expect } from "chai";
import * as path from "path";
import { walkDirectory } from "../../src/io/walkDirectory";
import { checkFileSupport } from "../../src/misc/searchForFiles";
import { store } from "../../src/store";
import { assets } from "../paths";

describe("walkDirectory", () => {
  it("finds a deeply nested image", async () => {
    const files: string[] = [];
    store.isSearching = true;
    await walkDirectory(assets, file => files.push(file), checkFileSupport);
    store.isSearching = false;
    const names = files.map(file => path.basename(file));
    expect(names).contains("img-deep.png");
  });
});
