const moment = require("moment");

const transformDeliveryDetails = require("../helpers/transformDeliveryDetails");
const GrabExpressService = require("../services/grabexpress-service");
const grabExpressService = new GrabExpressService();

let deliveryFee = 0;

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

  // getDeliveryQuotes: async (req, res) => {
  //   try {
  //     const deliveryPayload = await transformDeliveryDetails(req.body);
  //     const deliveryDetails = JSON.parse(deliveryPayload);
  //     // const deliveryDetails = req.body;
  //     const token = await grabExpressService.getAuthToken(req);
  //     const response = await grabExpressService.getDeliveryQuotes(
  //       deliveryDetails,
  //       token
  //     );

  //     const total_price = response.quotes.map((quote) => quote.amount);
  //     const pickupTimeline = response.quotes.map(
  //       (quote) => quote.estimatedTimeline.pickup
  //     );
  //     const dropoffTimeline = response.quotes.map(
  //       (quote) => quote.estimatedTimeline.dropoff
  //     );

  //     const deliveryQuotes = {
  //       rates: [
  //         {
  //           service_name: "Grab Express",
  //           service_code: "GRAB_EXPRESS",
  //           total_price: parseFloat(total_price[0]).toFixed(2).replace(".", ""),
  //           description: `Estimated Timeline:
  //             ${moment(pickupTimeline).format("MMMM D, YYYY h:mm A")} -
  //            ${moment(dropoffTimeline).format("MMMM D, YYYY h:mm A")}`,
  //           currency: "PHP",
  //           min_delivery_time: 30,
  //           max_delivery_time: 60,
  //         },
  //       ],
  //     };

  //     // res.status(200).json({ message: "success", data: response });
  //     res.status(200).json(deliveryQuotes);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Error fetching delivery quotes" });
  //   }
  // },

  getDeliveryQuotes: async (req, res) => {
    try {
      const deliveryDetails = req.body;
      const token = await grabExpressService.getAuthToken(req);
      const response = await grabExpressService.getDeliveryQuotes(
        deliveryDetails,
        token
      );

      deliveryFee = response.quotes[0].amount;
      console.log(deliveryFee);
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching delivery quotes" });
    }
  },

  fetchDeliveryQuotes: async (req, res) => {
    try {
      res.status(200).json({
        rates: [
          {
            service_name: "Grab Express",
            service_code: "GRAB_EXPRESS",
            total_price: parseFloat(deliveryFee).toFixed(2).replace(".", ""),
            description: "SAMPLE TEXT",
            currency: "PHP",
            min_delivery_time: 30,
            max_delivery_time: 60,
          },
        ],
      });
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

//  async trackDeliveryStatus(req, res) {
//     try {
//       const webhookData = req.body; // Webhook payload from Grab Express
//       await this.grabExpressService.trackDeliveryStatus(webhookData);

//       res.status(200).json({
//         success: true,
//         message: "Delivery status processed successfully.",
//       });
//     } catch (error) {
//       console.error("Error in trackDeliveryStatus:", error.message);
//       res.status(500).json({
//         success: false,
//         message: "Failed to process delivery status.",
//         error: error.message,
//       });
//     }
//   }

module.exports = grabExpressController;
