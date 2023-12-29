const fs = require("fs");
const path = require("path");

const BEGIN_FILE_SET = "***begin-file-set***";
const END_FILE_SET = "end-file-set";
const START_FILE = "start";
const END_FILE = "end";

const parseCompiledFile = (inputFile) => {
  const fileContent = fs.readFileSync(inputFile, "utf8");
  const lines = fileContent.split("\n");

  let currentFile = null;
  let currentFileType = null;
  let fileData = "";
  let isInFile = false;

  for (const line of lines) {
    if (line.startsWith(START_FILE)) {
      // Extract file name and type
      const parts = line.split(" ");
      currentFile = parts[1];
      currentFileType = parts[2];
      isInFile = true;
      fileData = "";
    } else if (line === END_FILE) {
      isInFile = false;
      // Process the file data here
      console.log(
        `File: ${currentFile}, Type: ${currentFileType}, Data: ${fileData}`
      );
      // Example: You could recreate files, modify contents, etc.
    } else if (isInFile) {
      fileData += line + "\n";
    }
  }
};

// Example usage:
// parseCompiledFile('path-to-compiled-output.txt');
