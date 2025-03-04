import express from "express";
import { GrabController } from "../controllers/grab-controller.js";

export const grabRoutes = express.Router();

grabRoutes.post("/auth/token", GrabController.getAuthToken);
grabRoutes.post("/delivery-quotes", GrabController.getDeliveryQuotes);
grabRoutes.post("/fetch-delivery-quotes", GrabController.fetchDeliveryQuotes);
grabRoutes.post("/delivery-request", GrabController.createDeliveryRequest);
grabRoutes.get(
  "/delivery-details/:deliveryID",
  GrabController.getDeliveryDetails
);
grabRoutes.delete("/delivery/:deliveryID", GrabController.cancelDelivery);
grabRoutes.post("/webhook", GrabController.trackDeliveryStatus);
