const fs = require("fs");
const path = require("path");

const BEGIN_FILE_SET = "***begin-file-set***";
const END_FILE_SET = "end-file-set";
const START_FILE = "start";
const END_FILE = "end";

const parseCompiledFile = (inputFile, outputFolder) => {
  const fileContent = fs.readFileSync(inputFile, "utf8");
  const lines = fileContent.split("\n");

  let currentFile = null;
  let fileData = "";
  let isInFile = false;

  for (const line of lines) {
    if (line.startsWith(START_FILE)) {
      const parts = line.split(" ");
      currentFile = parts[1];
      isInFile = true;
      fileData = "";
    } else if (line === END_FILE) {
      isInFile = false;
      // Write file data to the output folder
      const outputPath = path.join(outputFolder, currentFile);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, fileData);
      console.log(`File written: ${outputPath}`);
    } else if (isInFile) {
      fileData += line + "\n";
    }
  }
};

// Check for correct number of command-line arguments
if (process.argv.length < 3) {
  console.error(
    "Usage: node parser.js <input-parse-content.txt> [OUTPUTFOLDER=<output-folder-path>]"
  );
  process.exit(1);
}

// Retrieve the input file path from command-line arguments
const inputFile = process.argv[2];

// Optional output folder
let outputFolder = ".";
if (process.argv.length === 4 && process.argv[3].startsWith("OUTPUTFOLDER=")) {
  outputFolder = process.argv[3].split("=")[1];
}

// Call the function with the provided arguments
parseCompiledFile(inputFile, outputFolder);
