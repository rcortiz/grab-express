const axios = require("axios");
const { googleMaps } = require("../config/credentials");

class GoogleMapsService {
  // Get formatted address from latitude & longitude
  async getFormattedAddress(lat, lng) {
    try {
      const response = await axios.get(`${googleMaps.baseURL}/geocode/json`, {
        params: {
          latlng: `${lat},${lng}`,
          key: googleMaps.apiKey,
        },
      });

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

module.exports = GoogleMapsService;
