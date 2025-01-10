const grabExpressService = require("../services/grabExpressService");

const grabExpressController = {
  getDeliveryQuotes: async (req, res) => {
    try {
      // const deliveryDetails = req.body;
      // const token = await grabExpressService.getAuthToken(req);
      // const response = await grabExpressService.getDeliveryQuotes(
      //   deliveryDetails,
      //   token
      // );
      // res.status(201).json(response);
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching delivery quotes" });
    }
  },

  createDeliveryRequest: async (req, res) => {
    try {
      const deliveryDetails = req.body;
      const token = await grabExpressService.getAuthToken(req);
      const response = await grabExpressService.createDeliveryRequest(
        deliveryDetails,
        token
      );
      res.stsatus(201).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating delivery request" });
    }
  },

  getDeliveryDetails: async (req, res) => {
    try {
      const { deliveryID } = req.params;
      const token = await grabExpressService.getAuthToken(req);
      const response = await grabExpressService.getDeliveryDetails(
        deliveryID,
        token
      );
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching delivery details:", error);
      res.status(500).json({ message: "Error fetching delivery details" });
    }
  },

  cancelDelivery: async (req, res) => {
    try {
      const { deliveryID } = req.params;
      const token = await grabExpressService.getAuthToken(req);
      const response = await grabExpressService.cancelDelivery(
        deliveryID,
        token
      );
      res.status(200).json(response);
    } catch (error) {
      console.error("Error cancelling delivery:", error);
      res.status(500).json({ message: "Error cancelling delivery details" });
    }
  },

  // createOrder: async (req, res) => {
  //   try {
  //     const orderDetails = req.body;
  //     const order = await grabExpressService.createOrder(orderDetails);
  //     res.status(201).json(order);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Error creating order" });
  //   }
  // },
  // getOrderStatus: async (req, res) => {
  //   try {
  //     const { orderId } = req.params;
  //     const status = await grabExpressService.getOrderStatus(orderId);
  //     res.json(status);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Error fetching order status" });
  //   }
  // },
};

module.exports = grabExpressController;
