const express = require("express");
const router = express.Router();
const grabExpressController = require("../controllers/grabExpressController");

router.post("/delivery-quotes", grabExpressController.getDeliveryQuotes);
router.post("/delivery-request", grabExpressController.createDeliveryRequest);
router.get(
  "/delivery-details/:deliveryID",
  grabExpressController.getDeliveryDetails
);
router.delete("/delivery/:deliveryID", grabExpressController.cancelDelivery);

// router.post("/orders", grabExpressController.createOrder);
// router.get("/orders/:orderId", grabExpressController.getOrderStatus);

module.exports = router;
