import cors from "cors";

export const corsMiddleware = cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://127.0.0.1:9292",
    "https://rcortiz-dev.myshopify.com",
    "https://rcortiz-dev.myshopify.com/*",
    "*",
  ],
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
