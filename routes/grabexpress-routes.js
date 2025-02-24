const express = require("express");
const grabExpressController = require("../controllers/grabexpress-controller");

const router = express.Router();

router.post("/auth/token", grabExpressController.getAuthToken);
router.post("/delivery-quotes", grabExpressController.getDeliveryQuotes);
router.post(
  "/fetch-delivery-quotes",
  grabExpressController.fetchDeliveryQuotes
);
router.post("/delivery-request", grabExpressController.createDeliveryRequest);
router.get(
  "/delivery-details/:deliveryID",
  grabExpressController.getDeliveryDetails
);
router.delete("/delivery/:deliveryID", grabExpressController.cancelDelivery);
router.post("/webhook", grabExpressController.trackDeliveryStatus);

module.exports = router;
