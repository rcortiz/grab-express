const GrabExpressService = require("../services/grabexpress-service");
const grabExpressService = new GrabExpressService();

const grabExpressController = {
  getAuthToken: async (req, res) => {
    try {
      const token = await grabExpressService.getAuthToken(req);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error fetching auth token:", error);
      res.status(500).json({ message: "Error fetching auth token" });
    }
  },

  getDeliveryQuotes: async (req, res) => {
    try {
      const deliveryDetails = req.body;
      const token = await grabExpressService.getAuthToken(req);
      const response = await grabExpressService.getDeliveryQuotes(
        deliveryDetails,
        token
      );

      res.status(200).json({ message: "success", data: response });
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

      res.status(201).json({ message: "success", data: response });
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
      res.status(200).json({ message: "success", data: response });
    } catch (error) {
      console.error("Error fetching delivery details:", error);
      res.status(500).json({ message: "Error fetching delivery details" });
    }
  },

  cancelDelivery: async (req, res) => {
    try {
      const { deliveryID } = req.params;
      const token = await grabExpressService.getAuthToken(req);

      await grabExpressService.cancelDelivery(deliveryID, token);

      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error("Error cancelling delivery:", error);
      res.status(500).json({ message: "Error cancelling delivery details" });
    }
  },

  trackDeliveryStatus: async (req, res) => {
    try {
      const webhookData = req.body;
      console.log("Received Webhook:", webhookData);

      await grabExpressService.trackDeliveryStatus(webhookData);

      res.status(200).json({ message: "Webhook received successfully" });
    } catch (error) {
      console.error("Error processing webhook:", error.message);
      res.status(500).json({ message: "Error processing webhook" });
    }
  },
};

module.exports = grabExpressController;
