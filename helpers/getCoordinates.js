const axios = require("axios");

async function getCoordinates(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}
