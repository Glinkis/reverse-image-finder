import * as fs from "fs";
import * as path from "path";

type Done = (error: Error | null, results?: string[]) => void;

export const walkDirectory = (dir: string, done: Done) => {
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
          results.push(file);
          if (!--pending) {
            done(null, results);
          }
        }
      });
    });
  });
};
