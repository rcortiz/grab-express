const express = require("express");
const grabExpressController = require("../controllers/grabexpress-controller");

const router = express.Router();

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
