const express = require("express");
const router = express.Router();
const userRoutes = require("./user-routes");
const grabExpressRoutes = require("./grabexpress-routes");
const googleMapRoutes = require("./map-routes");

// Home route
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

// Prefix user routes with /user
router.use("/user", userRoutes);

// Prefix grab-express routes with /grab-express
router.use("/grab-express", grabExpressRoutes);

// Prefix map routes with /map
router.use("/map", googleMapRoutes);

// Prefix shopify webhooks routes with /shopify
router.use("/webhooks", googleMapRoutes);

module.exports = router;
