const fs = require("fs");
const path = require("path");

const START_TOKEN = "***start***";
const END_TOKEN = "***end***";

const compileFiles = (dirPath, outputFile) => {
  let compiledContent = "";

  const traverseDirectory = (dir) => {
    console.log(
      `PMM - SF - compiler.js - traverseDirectory - current dir is: ${JSON.stringify(
        dir
      )}`
    );
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        traverseDirectory(filePath); // Recursive call for directories
      } else {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const relativePath = path.relative(__dirname, filePath);
        compiledContent += `${START_TOKEN}\n${relativePath}\n${fileContent}\n${END_TOKEN}\n\n`;
        console.log(
          `PMM - SF - compiler.js - traverseDirectory - current compiledContent is: ${JSON.stringify(
            compiledContent
          )}`
        );
      }
    });
  };

  traverseDirectory(dirPath);

  try {
    fs.writeFileSync(outputFile, compiledContent);
  } catch (error) {
    console.error("Error writing the compiled file:", error.message);
  }
};

// Replace 'src/data-transfer' with the actual path of the directory to be compiled
// and 'path/to/your/compiledFile.txt' with the desired output file path
// compileFiles("src/data-transfer", "path/to/your/compiledFile.txt");
