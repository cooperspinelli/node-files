"use strict";

const fsP = require("fs/promises")

/** Takes in file path and logs content of the file in the console*/
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("file contents", contents);
}

const argv = process.argv;
cat(argv[2]);
