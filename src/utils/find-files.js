const fs = require("fs");
const path = require("path");

/**
 * @param {string} directoryPath
 * @return {string[]}
 */
const findFiles = (directoryPath) => {
  const files = fs.readdirSync(directoryPath).filter((file) => {
    return path.extname(file).toLowerCase() === ".json";
  });

  if (files.length === 0) return [];

  return files;
};

module.exports = findFiles;
