const express = require("express");
const ShopifyController = require("../controllers/shopify-controller");

const router = express.Router();

// Webhook endpoint for order creation
router.post("order-creation", ShopifyController.handleOrderCreation);

// Webhook endpoint for Grab Express delivery status updates
router.post("delivery-status", ShopifyController.trackDeliveryStatus);

module.exports = router;
