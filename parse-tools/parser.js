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

  // Resolve the absolute path of the output folder
  const absoluteOutputFolder = path.resolve(outputFolder);
  console.log(
    `PMM - SF - absoluteOutputFolder is: ${JSON.stringify(
      absoluteOutputFolder
    )}`
  );

  // Create the output folder if it doesn't exist
  if (!fs.existsSync(absoluteOutputFolder)) {
    // console.log(`Creating output folder: ${absoluteOutputFolder}`);
    fs.mkdirSync(absoluteOutputFolder, { recursive: true });
  }

  for (const line of lines) {
    if (line.startsWith(START_FILE)) {
      const parts = line.split(" ");
      // Update to handle relative paths correctly
      currentFile = parts.slice(1).join(" "); // Joining back in case the path has spaces
      isInFile = true;
      fileData = "";
    } else if (line === END_FILE) {
      isInFile = false;
      // Construct the full path for the file
      const fullPath = path.join(absoluteOutputFolder, currentFile);
      console.log(
        `PMM - SF - absoluteOutputFolder is: ${JSON.stringify(
          absoluteOutputFolder
        )}`
      );
      console.log(`PMM - SF - currentFile is: ${JSON.stringify(currentFile)}`);
      console.log(`PMM - SF - fullPath is: ${JSON.stringify(fullPath)}`);

      // Create directories as needed
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      // Write the file data
      fs.writeFileSync(fullPath, fileData);
      console.log(`File written: ${fullPath}`);
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
  // console.log(`PMM - SF - outputFolder is: ${JSON.stringify(outputFolder)}`);
}

// Call the function with the provided arguments
parseCompiledFile(inputFile, outputFolder);
