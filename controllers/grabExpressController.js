const grabExpressService = require("../services/grabExpressService");

const grabExpressController = {
  createOrder: async (req, res) => {
    try {
      const orderDetails = req.body;
      const order = await grabExpressService.createOrder(orderDetails);
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating order" });
    }
  },

  getOrderStatus: async (req, res) => {
    try {
      const { orderId } = req.params;
      const status = await grabExpressService.getOrderStatus(orderId);
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching order status" });
    }
  },
};

module.exports = grabExpressController;
