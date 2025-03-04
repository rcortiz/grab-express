import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const grabExpress = {
  baseURL: isProduction
    ? process.env.GRAB_EXPRESS_API_PRODUCTION_BASE_URL
    : process.env.GRAB_EXPRESS_API_STAGING_BASE_URL,
  clientId: process.env.GRAB_EXPRESS_CLIENT_ID,
  clientSecret: process.env.GRAB_EXPRESS_CLIENT_SECRET,
  grantType: "client_credentials",
  scope: "grab_express.partner_deliveries",
};

export const googleMaps = {
  baseURL: process.env.GOOGLE_MAPS_API_BASE_URL,
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
};
