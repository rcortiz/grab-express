import express from "express";
import ShopifyController from "../controllers/shopify-controller.js";

export const shopifyRoutes = express.Router();
const shopifyController = new ShopifyController();

// Webhook endpoint for order creation
shopifyRoutes.post("order-creation", shopifyController.handleOrderCreate);

// Webhook endpoint for Grab Express delivery status updates
// shopifyRoutes.post("delivery-status", shopifyController.trackDeliveryStatus);
