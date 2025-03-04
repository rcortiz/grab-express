// const userRoutes = require("./user-routes");
// const googleMapRoutes = require("./map-routes");
import { Router } from "express";
import { grabRoutes } from "./grab-routes.js";
import { mapRoutes } from "./map-routes.js";
import { userRoutes } from "./user-routes.js";
import { shopifyRoutes } from "./shopify-routes.js";

export const routes = Router();

// Home route
routes.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

// Prefix user routes with /user
routes.use("/user", userRoutes);

// Prefix grab-express routes with /grab-express
routes.use("/grab-express", grabRoutes);

// Prefix map routes with /map
routes.use("/map", mapRoutes);

// Prefix shopify webhooks routes with /shopify
routes.use("/webhooks", shopifyRoutes);
