const express = require("express");
const path = require("path");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

const SortMiddleware = require("./app/controllers/middlewares/SortMiddleware");
const route = require("./routes/index");
const db = require("./config/db");

// connect to db
db.connect();
// custom middleware
app.use(SortMiddleware);

//HTTP logger
app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, "public")));
//template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

//routes init
route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
