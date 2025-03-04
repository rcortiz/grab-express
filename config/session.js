import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("Session secret not provided in environment variables.");
}

const sessionMiddleware = session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
});

export default sessionMiddleware;
