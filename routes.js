const router = require("express").Router();
const path = require("path");
const findRoute = require("./src/utils/find-route");

const directoryPath = path.join(__dirname, "./mocks");

router.all("*", (req, res, next) => {
  const route = findRoute(directoryPath, req);

  if (!route) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(route.response.status).json(route.response.body);
});

module.exports = router;
