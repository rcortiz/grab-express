const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://127.0.0.1:9292",
    "https://rcortiz-dev.myshopify.com",
    "https://rcortiz-dev.myshopify.com/*",
  ],
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

console.log("CORS Configuration Applied");

module.exports = cors(corsOptions);
