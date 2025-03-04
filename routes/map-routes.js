import express from "express";
import MapController from "../controllers/map-controller.js";

export const mapRoutes = express.Router();
const mapController = new MapController();

mapRoutes.post("/get-map-data", mapController.getMapData);
