const GoogleMapsService = require("../services/gmap-service");
const googleMapService = new GoogleMapsService();

const gmapController = {
  getMapData: async (req, res) => {
    const { pickup, dropoff } = req.body;

    if (!pickup || !dropoff) {
      return res
        .status(400)
        .json({ error: "Pickup and dropoff locations are required" });
    }

    try {
      // Fetch geocode data for both locations
      const [pickupLocation, dropoffLocation] = await Promise.all([
        googleMapService.getGeocode(pickup),
        googleMapService.getGeocode(dropoff),
      ]);

      // Fetch directions data
      const directions = await googleMapService.getDirections(
        `${pickupLocation.lat},${pickupLocation.lng}`,
        `${dropoffLocation.lat},${dropoffLocation.lng}`
      );

      res.json({
        pickupLocation,
        dropoffLocation,
        directions,
      });
    } catch (error) {
      console.error("Error fetching map data:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = gmapController;
