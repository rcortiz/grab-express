const isProduction = process.env.NODE_ENV === "production";

export const GRAB_EXPRESS_CONFIG = {
  BASE_URL: isProduction
    ? process.env.GRAB_EXPRESS_API_PRODUCTION_BASE_URL
    : process.env.GRAB_EXPRESS_API_STAGING_BASE_URL,
  CLIENT_ID: process.env.GRAB_EXPRESS_CLIENT_ID,
  CLIENT_SECRET: process.env.GRAB_EXPRESS_CLIENT_SECRET,
  GRANT_TYPE: "client_credentials",
  SCOPE: "grab_express.partner_deliveries",
};

export const GOOGLE_MAPS_CONFIG = {
  BASE_URL: process.env.GOOGLE_MAPS_API_BASE_URL,
  API_KEY: process.env.GOOGLE_MAPS_API_KEY,
};
