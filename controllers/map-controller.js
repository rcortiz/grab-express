import { MapService } from "../services/map-service.js";

export class MapController {
  static async getMapData(req, res) {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    try {
      // Fetch formatted address based on the given coordinates
      const formattedAddress = await MapService.getFormattedAddress(
        latitude,
        longitude
      );

      res.json({ formattedAddress });
    } catch (error) {
      console.error("Error fetching formatted address:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
