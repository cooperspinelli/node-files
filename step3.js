"use strict";

const fsP = require("fs/promises");

/** Takes in file path and callback function and calls callback function
 * on content.*/
async function cat(path, useContent) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  useContent(contents);
}

/** Takes in a url and callback function, makes a fetch request to the url,
* calls callback function on content */
async function webCat(url, useContent) {
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  const responseText = await response.text();
  useContent(responseText);
}

/* Takes in text content and writes to file of filePath  */
async function writeToFile(content, filePath) {
  try {
    await fsP.writeFile(filePath, content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Takes in user input and calls webCat or cat with a callback depending
// on whether input has flag and whether file reading from is url or a file path
const argv = process.argv;
let input;
let useContent;

if (argv[2] === '--out') {
  input = argv[4];
  useContent = (content) => writeToFile(content, argv[3]);
} else {
  input = argv[2];
  useContent = console.log
}

if (URL.canParse(input)) {
  webCat(input, useContent);
} else {
  cat(input, useContent);
}

