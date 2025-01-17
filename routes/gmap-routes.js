const express = require("express");
const googleMapController = require("../controllers/gmap-controller");

const router = express.Router();

router.post("/get-map-data", googleMapController.getMapData);

module.exports = router;
