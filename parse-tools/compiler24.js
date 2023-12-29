const fs = require("fs");
const path = require("path");

const BEGIN_FILE_SET = "***begin-file-set***";
const END_FILE_SET = "end-file-set";
const START_FILE = "start";
const END_FILE = "end";

const compileFiles = (dirPath, outputFile) => {
  let compiledContent = `${BEGIN_FILE_SET}\n\n`;

  const traverseDirectory = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        traverseDirectory(filePath); // Recursive call for directories
      } else {
        // Check if the file is a .js or .json file
        if (filePath.endsWith(".js") || filePath.endsWith(".json")) {
          const fileContent = fs.readFileSync(filePath, "utf8");
          const relativePath = path.relative(__dirname, filePath);
          const fileType = filePath.endsWith(".js") ? "javascript" : "json";

          compiledContent += `${START_FILE} ${relativePath}\n${fileType}\n\n${fileContent}\n${END_FILE}\n\n`;
        }
      }
    });
  };

  traverseDirectory(dirPath);
  compiledContent += `${END_FILE_SET}`;

  try {
    fs.writeFileSync(outputFile, compiledContent);
  } catch (error) {
    console.error("Error writing the compiled file:", error.message);
  }
};

// Checking for correct number of command-line arguments
if (process.argv.length !== 4) {
  console.error(
    "Usage: node compiler.js <path-to-folder-structure> <fully-qualified-output-file.js>"
  );
  process.exit(1);
}

// Setting environment variables (optional, modify as needed)
// process.env.MY_ENV_VARIABLE = 'value';

// Retrieving directory path and output file from command-line arguments
const dirPath = process.argv[2];
const outputFile = process.argv[3];

// Calling the function with the provided arguments
compileFiles(dirPath, outputFile);
