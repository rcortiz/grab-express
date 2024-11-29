require("dotenv").config();

const grabExpressCredentials = {
  baseURL: process.env.GRAB_EXPRESS_API_BASE_URL,
  apiKey: process.env.GRAB_EXPRESS_API_KEY,
};

module.exports = grabExpressCredentials;
