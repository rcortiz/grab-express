const axios = require("axios");
const { googleMaps } = require("../config/credentials");

class GoogleMapsService {
  constructor() {}

  // Get geocode for a given address
  async getGeocode(address) {
    try {
      const response = await axios.get(`${googleMaps.baseURL}/geocode/json`, {
        params: {
          address,
          key: googleMaps.apiKey,
        },
      });

      if (response.data.results.length === 0) {
        throw new Error("No results found for the given address");
      }

      return response.data.results[0].geometry.location;
    } catch (error) {
      console.error("Error fetching geocode:", error.message);
      throw new Error("Failed to fetch geocode data");
    }
  }

  // Get directions between two locations
  async getDirections(origin, destination) {
    try {
      const response = await axios.get(
        `${googleMaps.baseURL}/directions/json`,
        {
          params: {
            origin,
            destination,
            mode: "driving",
            key: googleMaps.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching directions:", error.message);
      throw new Error("Failed to fetch directions data");
    }
  }
}

module.exports = GoogleMapsService;
