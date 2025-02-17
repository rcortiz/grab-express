const axios = require("axios");

async function getCoordinates(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

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

async function transformToGrabExpress(response) {
  const { origin, destination, items } = response.rate;

  const destinationCoordinates = await getCoordinates(destination.address1);

  if (!destinationCoordinates) {
    console.error("Error: Could not fetch destination coordinates.");
    return null;
  }

  const grabExpressPayload = {
    serviceType: "INSTANT",
    vehicleType: "BIKE",
    codType: "REGULAR",
    packages: [
      {
        name: "Orange Snowboard",
        description: "No description",
        quantity: 1,
        price: 10000,
        dimensions: {
          height: 0,
          width: 0,
          depth: 0,
          weight: 0,
        },
      },
    ],
    origin: {
      address: `${origin.address1}, ${origin.city}, Metro Manila, Philippines`,
      keywords: `${origin.city}, Metro Manila`,
      cityCode: "MNL",
      coordinates: {
        latitude: origin.latitude,
        longitude: origin.longitude,
      },
    },
    destination: {
      address: `${destination.address1}, ${destination.city}, Metro Manila, Philippines ${destination.postal_code}`,
      keywords: `${destination.city}, Metro Manila`,
      cityCode: "MNL",
      coordinates: {
        latitude: destinationCoordinates.latitude,
        longitude: destinationCoordinates.longitude,
        // latitude: 14.4962781,
        // longitude: 121.0357426,
      },
    },
  };

  return JSON.stringify(grabExpressPayload);
}

module.exports = transformToGrabExpress;
