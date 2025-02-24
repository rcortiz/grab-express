const getCoordinates = require("../helpers/getCoordinates");
const { getProvinceName } = require("../helpers/fetchLocation");

const transformToGrabExpress = async (response) => {
  // console.log(JSON.stringify(response));
  const { origin, destination, items } = response.rate;

  const destinationCoordinates = await getCoordinates(destination.address1);
  const province = getProvinceName(destination.province);

  if (!destinationCoordinates) {
    console.error("Error: Could not fetch destination coordinates.");
    return null;
  }

  const payload = {
    serviceType: "INSTANT",
    vehicleType: "BIKE",
    codType: "REGULAR",
    packages: items.map((item) => ({
      name: item.name,
      description: item.description || "No Description",
      quantity: item.quantity,
      price: item.price,
      dimension: {
        height: item.height || 0,
        width: item.width || 0,
        depth: item.depth || 0,
        weight: item.grams || 0,
      },
    })),
    origin: {
      address: `${origin.address1}, ${origin.city}, Metro Manila, Philippines`,
      cityCode: "MNL",
      coordinates: {
        latitude: origin.latitude,
        longitude: origin.longitude,
      },
    },
    destination: {
      address: `${destination.address1}, ${destination.city}, ${province}, Philippines ${destination.postal_code}`,
      cityCode: "MNL",
      coordinates: {
        latitude: destinationCoordinates.latitude,
        longitude: destinationCoordinates.longitude,
      },
    },
  };

  console.log(payload);

  return JSON.stringify(payload);
};

module.exports = transformToGrabExpress;
