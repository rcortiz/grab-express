const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://127.0.0.1:9292",
    "https://rcortiz-dev.myshopify.com",
  ],
  // origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  allowedHeaders: ["Content-Type"],
  // credentials: true,
  optionsSuccessStatus: 204,
};

// const corsOptions = {
//   origin: "https://rcortiz-dev.myshopify.com",
//   optionsSuccessStatus: 200,
// };

console.log("CORS Configuration Applied");

module.exports = cors(corsOptions);
