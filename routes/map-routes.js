const express = require("express");
const GoogleMapController = require("../controllers/map-controller");

const router = express.Router();

router.post("/get-map-data", GoogleMapController.getMapData);

module.exports = router;
