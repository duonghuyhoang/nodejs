const newsRouter = require("./news");
const meRouter = require("./me");
const siteRouter = require("./site");
const coursesRouter = require("./courses");

function route(app) {
  app.get("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.get("/", siteRouter);
}

module.exports = route;
