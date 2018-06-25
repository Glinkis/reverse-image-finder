import { app, remote } from "electron";
import * as fs from "fs";

const userDataPath = (app || remote.app).getPath("userData");
const savePath = userDataPath + "/indexed/";
if (!fs.existsSync(savePath)) {
  fs.mkdirSync(savePath);
}
console.info(userDataPath);

export const writePixelData = (path: string, data: Uint8Array) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(savePath + path, data, err => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export const readPixelData = (path: string) => {
  return new Promise<Uint8Array>((resolve, reject) => {
    fs.readFile(savePath + path, (err, data) => {
      resolve(data);
    });
  });
};
