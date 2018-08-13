import { app, remote } from "electron";
import * as fs from "fs";
import * as path from "path";

export const getIndexDirectory = () => {
  const dir = path.join((app || remote.app).getPath("userData"), "indexed");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return dir;
};
