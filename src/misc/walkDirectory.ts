import * as fs from "fs";
import * as path from "path";
import { store } from "./store";

type Done = (error: Error | null, results?: string[]) => void;

export const walkDirectory = (dir: string, done: Done) => {
  store.isSearching = true;
  let results: string[] = [];

  fs.readdir(dir, (error: Error, list: string[]) => {
    if (error) {
      return done(error);
    }

    let pending = list.length;
    if (!pending) {
      return done(null, results);
    }

    list.forEach((file: string) => {
      file = path.resolve(dir, file);
      fs.stat(file, (error2, stat) => {
        if (error2) {
          done(error2);
        }
        if (stat && stat.isDirectory()) {
          walkDirectory(file, (error3, res) => {
            if (error3) {
              done(error3);
            }
            if (res) {
              results = results.concat(res);
            }
            if (!--pending) {
              done(null, results);
            }
          });
        } else {
          for (const decoder of store.decoders) {
            if (path.extname(file) === `.${decoder.ext}`) {
              results.push(file);
            }
          }
          store.searchedFiles++;
          if (!--pending) {
            done(null, results);
          }
        }
      });
    });
  });
};
