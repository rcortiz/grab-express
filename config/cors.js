const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

console.log("CORS Configuration Applied");

module.exports = cors(corsOptions);
