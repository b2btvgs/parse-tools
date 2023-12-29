const fs = require("fs");
const path = require("path");

const START_TOKEN = "***start***";
const END_TOKEN = "***end***";

const parseFile = (filePath) => {
  try {
    // Read the content of the file
    const fileContent = fs.readFileSync(filePath, "utf8");
    const fileBlocks = fileContent.split(END_TOKEN);

    fileBlocks.forEach((block) => {
      const startTokenIndex = block.indexOf(START_TOKEN);
      if (startTokenIndex !== -1) {
        const fileContent = block.substring(
          startTokenIndex + START_TOKEN.length
        );
        const firstLineEndIndex = fileContent.indexOf("\n");
        const fileName = fileContent.substring(0, firstLineEndIndex).trim();
        const fileData = fileContent.substring(firstLineEndIndex).trim();

        try {
          // Creating directories based on the fileName
          const dirPath = path.join(
            __dirname,
            ...fileName.split("/").slice(0, -1)
          );
          fs.mkdirSync(dirPath, { recursive: true });

          // Write the file
          const fullPath = path.join(__dirname, fileName);
          fs.writeFileSync(fullPath, fileData);
        } catch (writeError) {
          console.error(`Error writing file ${fileName}:`, writeError.message);
        }
      }
    });
  } catch (readError) {
    console.error("Error reading the input file:", readError.message);
  }
};

// Replace 'path/to/your/projectFiles.txt' with the actual path
parseFile("path/to/your/projectFiles.txt");
