const axios = require("axios");
const grabExpressCredentials = require("../config/grabExpressCredentials");

const grabExpressService = {
  token: null,
  tokenExpiration: null,

  // Authentication purposes before using GrabExpress API
  getAuthToken: async () => {
    const now = new Date();

    if (this.token && this.tokenExpiration && now < this.tokenExpiration) {
      return this.token;
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

      this.token = response.data.access_token;
      this.tokenExpiration = new Date(
        now.getTime() + response.data.expires_in * 1000
      );

      return this.token;
    } catch (error) {
      console.error("Error fetching auth token:", error.response?.data);
      throw error;
    }
  },

  // To get delivery quotes before customer place an order
  getDeliveryQuotes: async (deliveryDetails) => {
    try {
      const token = await this.getAuthToken();
      const response = await axios.post(
        `${grabExpressCredentials.baseURL}/v1/deliveries/quotes`,
        deliveryDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
  },

  // To request delivery service
  createDeliveryRequest: async (deliveryDetails) => {
    try {
      const token = await this.getAuthToken();
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
  },

  getDeliveryDetails: async (deliveryID) => {
    try {
      const token = await this.getAuthToken();
      const response = await axios.get(
        `
        ${grabExpressCredentials.baseURL}/v1/deliveries/${deliveryID}
      `,
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
  },

  cancelDelivery: async (deliveryID) => {
    try {
      const token = await this.getAuthToken();
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
  },

  // createOrder: async (orderDetails) => {
  //   try {
  //     const token = await this.getAuthToken();
  //     const response = await axios.post(
  //       `${grabExpressCredentials.baseURL}/orders`,
  //       orderDetails,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error(
  //       "Error creating order with Grab Express:",
  //       error.response.data || error.message
  //     );
  //     throw error;
  //   }
  // },

  // getOrderStatus: async (orderId) => {
  //   try {
  //     const token = await this.getAuthToken();
  //     const response = await axios.get(
  //       `${grabExpressCredentials.baseURL}/orders/${orderId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(
  //       "Error fetching order status from Grab Express:",
  //       error.response.data || error.message
  //     );
  //     throw error;
  //   }
  // },
};

module.exports = grabExpressService;
