const router = require("express").Router();
const path = require("path");
const findRoute = require("./src/utils/find-route");

const directoryPath = path.join(__dirname, "./mocks");

router.all("*", async (req, res, next) => {
  const route = findRoute(directoryPath, req);

  if (!route) {
    return res.status(404).json({ message: "Not found" });
  }

  if (route.config) {
    if (route.config.response_time) {
      await new Promise((r) => setTimeout(r, route.config.response_time));
    }
  }

  return res.status(route.response.status).json(route.response.body);
});

module.exports = router;
