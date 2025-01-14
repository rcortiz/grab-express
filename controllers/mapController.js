const mapService = require("../services/mapService");

const getMapData = async (req, res) => {
  const { pickup, dropoff } = req.body;

  if (!pickup || !dropoff) {
    return res
      .status(400)
      .json({ error: "Pickup and dropoff locations are required" });
  }

  try {
    // Fetch geocode data for both locations
    const [pickupLocation, dropoffLocation] = await Promise.all([
      mapService.getGeocode(pickup),
      mapService.getGeocode(dropoff),
    ]);

    // Fetch directions data
    const directions = await mapService.getDirections(
      `${pickupLocation.lat},${pickupLocation.lng}`,
      `${dropoffLocation.lat},${dropoffLocation.lng}`
    );

    res.json({
      pickupLocation,
      dropoffLocation,
      directions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMapData,
};
