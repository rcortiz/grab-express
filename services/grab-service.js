import axios from "axios";
import qs from "querystring";
import { GRAB_EXPRESS_CONFIG } from "../config/credentials.js";

export class GrabService {
  // Fetch authentication token
  static async getAuthToken(req) {
    const now = new Date();

    // Check if token exists in session and is still valid
    if (
      req.session.token &&
      req.session.tokenExpiresAt &&
      req.session.tokenExpiresAt > now
    ) {
      return req.session.token;
    }

    try {
      const response = await axios.post(
        "https://partner-api.grab.com/grabid/v1/oauth2/token",
        qs.stringify({
          client_id: GRAB_EXPRESS_CONFIG.CLIENT_ID,
          client_secret: GRAB_EXPRESS_CONFIG.CLIENT_SECRET,
          grant_type: GRAB_EXPRESS_CONFIG.GRANT_TYPE,
          scope: GRAB_EXPRESS_CONFIG.SCOPE,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
          },
        }
      );

      console.log(response);

      req.session.token = response.data.access_token;
      req.session.tokenExpiresAt = new Date(
        now.getTime() + response.data.expires_in * 1000
      );

      return req.session.token;
    } catch (error) {
      console.error(
        "Error fetching auth token:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Get delivery quotes
  static async getDeliveryQuotes(deliveryDetails, token) {
    try {
      const response = await axios.post(
        `${GRAB_EXPRESS_CONFIG.BASE_URL}/v1/deliveries/quotes`,
        deliveryDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error getting delivery quotes with Grab Express:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Create a delivery request
  static async createDeliveryRequest(deliveryDetails, token) {
    try {
      const response = await axios.post(
        `${GRAB_EXPRESS_CONFIG.BASE_URL}/v1/deliveries`,
        deliveryDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error creating delivery request with Grab Express:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Get delivery details
  static async getDeliveryDetails(deliveryID, token) {
    console.log(GRAB_EXPRESS_CONFIG.BASE_URL);
    try {
      const response = await axios.get(
        `${GRAB_EXPRESS_CONFIG.BASE_URL}/v1/deliveries/${deliveryID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching delivery details with Grab Express:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Cancel a delivery request
  static async cancelDelivery(deliveryID, token) {
    try {
      const response = await axios.delete(
        `${GRAB_EXPRESS_CONFIG.BASE_URL}/v1/deliveries/${deliveryID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(
        "Error cancelling delivery with Grab Express:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Track delivery status of the package
  static async trackDeliveryStatus(webhookData) {
    try {
      const { deliveryID, status } = webhookData;
      console.log(`Processing webhook for Tracking ID: ${deliveryID}`);

      switch (status) {
        case "ALLOCATING":
          console.log(
            `Tracking ID ${deliveryID}: Package allocation in progress.`
          );
          break;

        case "PENDING_PICKUP":
          console.log(`Tracking ID ${deliveryID}: Package pending pickup.`);
          break;

        case "PICKING_UP":
          console.log(`Tracking ID ${deliveryID}: Package is being picked up.`);
          break;

        case "PENDING_DROP_OFF":
          console.log(`Tracking ID ${deliveryID}: Package pending drop-off.`);
          break;

        case "IN_DELIVERY":
          console.log(`Tracking ID ${deliveryID}: Package is in delivery.`);
          break;

        case "IN_RETURN":
          console.log(
            `Tracking ID ${deliveryID}: Package is in return process.`
          );
          break;

        case "COMPLETED":
          console.log(`Tracking ID ${deliveryID}: Package delivery completed.`);
          break;

        case "CANCELED":
          console.log(`Tracking ID ${deliveryID}: Package delivery canceled.`);
          break;

        case "RETURNED":
          console.log(`Tracking ID ${deliveryID}: Package returned to sender.`);
          break;

        case "FAILED":
          console.log(`Tracking ID ${deliveryID}: Package delivery failed.`);
          break;

        case "PICKUP_COMPLETED":
          console.log(`Tracking ID ${deliveryID}: Package picked up.`);
          break;

        case "DELIVERY_COMPLETED":
          console.log(`Tracking ID ${deliveryID}: Package delivered.`);
          break;

        default:
          console.log(`Unhandled status: ${status}`);
      }
    } catch (error) {
      console.error("Error processing webhook:", error.message);
      throw error;
    }
  }
}
