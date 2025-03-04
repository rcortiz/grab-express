import axios from "axios";
import { GOOGLE_MAPS_CONFIG } from "../config/credentials.js";

export class MapService {
  // Get formatted address from latitude & longitude
  static async getFormattedAddress(lat, lng) {
    try {
      const response = await axios.get(
        `${GOOGLE_MAPS_CONFIG.BASE_URL}/geocode/json`,
        {
          params: {
            latlng: `${lat},${lng}`,
            key: GOOGLE_MAPS_CONFIG.API_KEY,
          },
        }
      );

      if (response.data.status !== "OK" || response.data.results.length === 0) {
        throw new Error("No address found for the given coordinates.");
      }

      return response.data.results[0].formatted_address;
    } catch (error) {
      console.error("Error fetching formatted address:", error.message);
      throw new Error("Failed to get address from Google Maps API.");
    }
  }
}
