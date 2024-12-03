const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const helmetConfig = require("./config/helmet");
const corsConfig = require("./config/cors");
const sessionConfig = require("./config/session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const grabExpressRouter = require("./routes/grabExpress");

const authMiddleware = require("./middleware/auth");

dotenv.config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmetConfig());
app.use(corsConfig);
app.use(sessionConfig());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/grab-express", grabExpressRouter);

app.get("/profile", authMiddleware, (req, res) => {
  res.send("This is a protected profile page.");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.render("error");
});

module.exports = app;
