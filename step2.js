"use strict";

const fsP = require("fs/promises");

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

/** Takes in a url, makes a fetch request to the url, and logs the text content
 * of the response to the console */
async function webCat(url) {
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  const responseText = await response.text();
  console.log(responseText);
}

// Takes in user input and calls webCat or cat depending on whether input is a
// url or a file path
const argv = process.argv;
const userInput = argv[2];
if (URL.canParse(userInput)) {
  webCat(userInput);
} else {
  cat(userInput);
}
