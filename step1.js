"use strict";

const fsP = require("fs/promises")

/** Takes in file path and logs content of the file in the console*/
async function cat(path) {
  try {
    // TODO: minimize stuff in try catch
    let contents = await fsP.readFile(path, "utf8");
    console.log("file contents", contents);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

const argv = process.argv;
cat(argv[2]);
