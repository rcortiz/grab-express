const express = require("express");
const router = express.Router();
const grabExpressController = require("../controllers/grabExpressController");

router.post("/orders", grabExpressController.createOrder);
router.get("/orders/:orderId", grabExpressController.getOrderStatus);

module.exports = router;
