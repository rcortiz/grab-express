const axios = require("axios");
const config = require("../config/grabExpress");

const grabExpressService = {
  createOrder: async (orderDetails) => {
    try {
      const response = await axios.post(
        `${config.baseURL}/orders`,
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error creating order with Grab Express:", err);
      throw err;
    }
  },

  getOrderStatus: async (orderId) => {
    try {
      const response = await axios.get(`${config.baseURL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      });
      return response.data;
    } catch (err) {
      console.log("Error fetching order status from Grab Express:", err);
      throw err;
    }
  },
};

module.exports = grabExpressService;
