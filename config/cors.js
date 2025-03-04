import cors from "cors";

const corsMiddleware = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://127.0.0.1:9292",
    "https://rcortiz-dev.myshopify.com",
    "https://rcortiz-dev.myshopify.com/*",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsMiddleware);
