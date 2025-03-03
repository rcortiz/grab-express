const axios = require("axios");

class ShopifyService {
  constructor() {}

  //  Fetch order details by order ID
  async getOrderDetails(orderId) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/orders/${orderId}.json`
      );
      return response.data.order;
    } catch (error) {
      console.error(
        "Error fetching order details:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Add Grab Delivery ID metafield to a product
  async addDeliveryIdToProduct(productId, deliveryId) {
    const payload = {
      metafield: {
        namespace: "delivery",
        key: "deliveryId",
        value: deliveryId,
        type: "string",
      },
    };

    try {
      const response = await axios.post(
        `${this.BASE_URL}/products/${productId}/metafields.json`,
        payload
      );
      return response.data.metafield;
    } catch (error) {
      console.error(
        "Error adding metafield:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Handle order creation webhook
  async handleOrderCreation(webhookData, deliveryId) {
    try {
      const orderId = webhookData.id;
      const orderDetails = await this.getOrderDetails(orderId);

      // Extract product IDs from the order line items
      const productIds = orderDetails.line_items.map((item) => item.product_id);

      // Add metafield to each product in the order
      for (const ids of productIds) {
        await this.addMetafieldToProduct(ids, deliveryId);
        console.log(`Added deliveryId metafield to product ${ids}`);
      }
    } catch (error) {
      console.error("Error handling order creation:", error.message);
      throw error;
    }
  }
}

module.exports = new ShopifyService();
