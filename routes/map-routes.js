import express from "express";

import { MapController } from "../controllers/map-controller.js";

export const mapRoutes = express.Router();

mapRoutes.post("/get-map-data", MapController.getMapData);
