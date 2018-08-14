import { app, remote } from "electron";
import * as fs from "fs";
import * as path from "path";

export const getIndexDir = () => {
  const userDataDir = (app || remote.app).getPath("userData");
  const indexDir = path.join(userDataDir, "indexed");

  if (!fs.existsSync(indexDir)) {
    fs.mkdirSync(indexDir);
  }

  return indexDir;
};
