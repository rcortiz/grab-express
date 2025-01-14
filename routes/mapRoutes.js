const express = require("express");
const mapController = require("../controllers/mapController");

const router = express.Router();

router.post("/get-map-data", mapController.getMapData);

module.exports = router;
