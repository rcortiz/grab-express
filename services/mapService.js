const axios = require("axios");
const { googleMaps } = require("../config/credentials");

const getGeocode = async (address) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: googleMaps.apiKey,
        },
      }
    );
    if (response.data.results.length === 0) {
      throw new Error("No results found for the given address");
    }

    return response.data.results[0].geometry.location;
  } catch (error) {
    console.error("Error fetching geocode:", error.message);
    throw new Error("Failed to fetch geocode data");
  }
};

const getDirections = async (origin, destination) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
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
};

module.exports = {
  getGeocode,
  getDirections,
};
