import express from "express";
import { ShopifyController } from "../controllers/shopify-controller.js";

export const shopifyRoutes = express.Router();

// Webhook endpoint for order creation
shopifyRoutes.post("order-creation", ShopifyController.handleOrderCreate);

// Webhook endpoint for Grab Express delivery status updates
// shopifyRoutes.post("delivery-status", ShopifyController.trackDeliveryStatus);
