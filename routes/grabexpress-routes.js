const express = require("express");
const GrabExpressController = require("../controllers/grabexpress-controller");

const router = express.Router();

router.post("/auth/token", GrabExpressController.getAuthToken);
router.post("/delivery-quotes", GrabExpressController.getDeliveryQuotes);
router.post(
  "/fetch-delivery-quotes",
  GrabExpressController.fetchDeliveryQuotes
);
router.post("/delivery-request", GrabExpressController.createDeliveryRequest);
router.get(
  "/delivery-details/:deliveryID",
  GrabExpressController.getDeliveryDetails
);
router.delete("/delivery/:deliveryID", GrabExpressController.cancelDelivery);
router.post("/webhook", GrabExpressController.trackDeliveryStatus);

module.exports = router;
