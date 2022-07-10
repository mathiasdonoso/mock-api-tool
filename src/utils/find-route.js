const fs = require("fs");
const findFiles = require("./find-files");

/**
 * @param {string} directoryPath
 * @param {Request} req
 * @return {object}
 */
const findRoute = (directoryPath, req) => {
  const { body, method, originalUrl } = req;
  const url = originalUrl;

  const files = findFiles(directoryPath);

  let routes = [];

  files.forEach((file) => {
    const rawdata = fs.readFileSync(`${directoryPath}/${file}`);
    const data = JSON.parse(rawdata);

    let prefix = "";

    if (data.prefix !== undefined) {
      prefix += data.prefix;
    }

    routes = data.cases.filter(
      (route) =>
        method.toLowerCase() === route.request.method.toLowerCase() &&
        url.toLowerCase() === `${prefix}${route.request.url.toLowerCase()}`
    );
  });

  if (Object.keys(body).length > 0) {
    const filteredByBody = routes.filter(
      (route) => JSON.stringify(body) === JSON.stringify(route.request.body)
    );

    if (filteredByBody.length > 0) {
      routes = filteredByBody;
    }
  }

  if (routes.length === 0) return null;

  return routes[0];
};

module.exports = findRoute;
