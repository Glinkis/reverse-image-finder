import { expect } from "chai";
import * as path from "path";
import { store } from "../../renderer/store";
import { walkDirectory } from "../io/walkDirectory";
import { checkFileSupport } from "./checkFileSupport";
import { assets } from "./consts";

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
