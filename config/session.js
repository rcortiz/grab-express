const session = require("express-session");
require("dotenv").config();

const sessionSecret = process.env.SESSION_SECRET;

const sessionConfig = () => {
  if (!sessionSecret) {
    throw new Error("Session secret not provided in environment variables.");
  }
  return session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  });
};

module.exports = sessionConfig;
