#!/bin/bash

# Assign execute permissions to the node script
chmod +x parser.js

# Check if there are at least two arguments provided
if [ "$#" -lt 2 ]; then
  echo "Usage: ./run_parser.sh <input-parse-content.txt> [OUTPUTFOLDER=<output-folder-path>]"
  exit 1
fi

# Run the node script with all passed arguments
node parser.js "$@"
