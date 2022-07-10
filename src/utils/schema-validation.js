const fs = require("fs");
const schema = require("../schemas/mocks");
const findFiles = require("./find-files");

/**
 * @param {string} filesDir
 */
const schemaValidation = (filesDir) => {
  const files = findFiles(filesDir);

  if (files.length === 0) throw Error(`There is no mock file`);

  files.forEach((file) => {
    const rawdata = fs.readFileSync(`${filesDir}/${file}`);
    const data = JSON.parse(rawdata);
    const validation = schema.validate(data);

    if (validation.error) {
      throw Error(`Schema validation: ${validation.error.message}`);
    }
  });
};

module.exports = schemaValidation;
