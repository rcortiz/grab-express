const axios = require("axios");
const grabExpressCredentials = require("../config/credentials");

class GrabExpressService {
  constructor() {
    this.token = null;
    this.tokenExpiresAt = null;
  }

  // Fetch authentication token
  async getAuthToken(req) {
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
        `${grabExpressCredentials.baseURL}/grabid/v1/oauth2/token`,
        {
          client_id: grabExpressCredentials.clientId,
          client_secret: grabExpressCredentials.clientSecret,
          grant_type: grabExpressCredentials.grantType,
          scope: grabExpressCredentials.scope,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      req.session.token = response.data.access_token;
      req.session.tokenExpiresAt = new Date(
        now.getTime() + response.data.expires_in * 1000
      );

      return req.session.token;
    } catch (error) {
      console.error("Error fetching auth token:", error.response?.data);
      throw error;
    }
  }

  // Get delivery quotes
  async getDeliveryQuotes(deliveryDetails, token) {
    try {
      const response = await axios.post(
        `${grabExpressCredentials.baseURL}/v1/deliveries/quotes`,
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
  async createDeliveryRequest(deliveryDetails, token) {
    try {
      const response = await axios.post(
        `${grabExpressCredentials.baseURL}/v1/deliveries`,
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
  async getDeliveryDetails(deliveryID, token) {
    try {
      const response = await axios.get(
        `${grabExpressCredentials.baseURL}/v1/deliveries/${deliveryID}`,
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
  async cancelDelivery(deliveryID, token) {
    try {
      const response = await axios.delete(
        `${grabExpressCredentials.baseURL}/v1/deliveries/${deliveryID}`,
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
        "Error cancelling delivery with Grab Express:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
module.exports = GrabExpressService;
