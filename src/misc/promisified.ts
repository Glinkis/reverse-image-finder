import * as fs from "fs";
import * as util from "util";

export const readFileAsync = util.promisify(fs.readFile);
export const writeFileAsync = util.promisify(fs.writeFile);
export const readdirAsync = util.promisify(fs.readdir);
export const unlinkAsync = util.promisify(fs.unlink);
