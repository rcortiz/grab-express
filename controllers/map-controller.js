import MapService from "../services/map-service.js";

class MapController {
  constructor() {
    this.mapService = new MapService();
  }

  getMapData = async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    try {
      // Fetch formatted address based on coordinates
      const formattedAddress = await this.mapService.getFormattedAddress(
        latitude,
        longitude
      );

      res.json({ formattedAddress });
    } catch (error) {
      console.error("Error fetching formatted address:", error);
      res.status(500).json({ error: error.message });
    }
  };
}

export default MapController;
