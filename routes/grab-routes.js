import express from "express";
import GrabController from "../controllers/grab-controller.js";

export const grabRoutes = express.Router();
const grabController = new GrabController();

grabRoutes.post("/auth/token", grabController.getAuthToken);
grabRoutes.post("/delivery-quotes", grabController.getDeliveryQuotes);
grabRoutes.post("/fetch-delivery-quotes", grabController.fetchDeliveryQuotes);
grabRoutes.post("/delivery-request", grabController.createDeliveryRequest);
grabRoutes.get(
  "/delivery-details/:deliveryID",
  grabController.getDeliveryDetails
);
grabRoutes.delete("/delivery/:deliveryID", grabController.cancelDelivery);
grabRoutes.post("/webhook", grabController.trackDeliveryStatus);
