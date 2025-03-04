import { ShopifyService } from "../services/shopify-service.js";
import { GrabService } from "../services/grab-service.js";

export class ShopifyController {
  static async handleOrderCreate(req, res) {
    try {
      const webhookData = req.body;
      const orderId = webhookData.id;

      // Fetch order details
      const orderDetails = await ShopifyService.getOrderDetails(orderId);

      // Format delivery details for Grab Express delivery request
      const deliveryDetails = {
        pickupAddress: "Test Address",
        dropoffAddress: "Test Address",
        items: orderDetails.line_items.map((item) => ({
          name: item.title,
          quantity: item.quantity,
        })),
      };

      // Create delivery request with Grab Express
      const deliveryRequest = await GrabService.createDeliveryRequest(
        deliveryDetails
      );

      // Get the delivery ID from Grab Express response
      const deliveryId = deliveryRequest.deliveryID;

      await ShopifyService.handleOrderCreation(webhookData, deliveryId);

      res.status(200).json({
        success: true,
        message: "Order processed and deliveryId added to products.",
        deliveryId,
      });
    } catch (error) {
      console.error("Error in handleOrderCreation:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to process order.",
        error: error.message,
      });
    }
  }
}
