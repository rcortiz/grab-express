import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import express from "express";
import helmetMiddleware from "./config/helmet.js";
import sessionMiddleware from "./config/session.js";
import corsMiddleware from "./config/cors.js";
import { routes } from "./routes/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmetMiddleware);
app.use(sessionMiddleware);
app.use(corsMiddleware);

app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(404));
});

// error handler
app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.render("error");
});

export default app;
