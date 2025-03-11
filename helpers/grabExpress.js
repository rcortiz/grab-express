const { Quotes, Package } = require("../models/grab-express");

async function saveDeliveryQuotes(data) {
  const { quotes, origin, destination, packages } = data;

  // Iterate over each quote
  for (const quote of quotes) {
    // Create the quote and save all data including origin and destination
    const quoteData = await Quotes.create({
      service_type: quote.service.type,
      service_name: quote.service.name,
      currency_code: quote.currency.code,
      currency_symbol: quote.currency.symbol,
      currency_exponent: quote.currency.exponent,
      amount: quote.amount,
      estimated_pickup: quote.estimatedTimeline.pickup,
      estimated_dropoff: quote.estimatedTimeline.dropoff,
      distance: quote.distance,
      origin_address: origin.address,
      origin_city_code: origin.cityCode,
      origin_latitude: origin.coordinates.latitude,
      origin_longitude: origin.coordinates.longitude,
      destination_address: destination.address,
      destination_city_code: destination.cityCode,
      destination_latitude: destination.coordinates.latitude,
      destination_longitude: destination.coordinates.longitude,
    });

    // Save associated packages for the quote
    for (const pkg of packages) {
      await Package.create({
        name: pkg.name,
        description: pkg.description,
        quantity: pkg.quantity,
        price: pkg.price,
        quote_id: quoteData.id, // Associate the package with the quote
      });
    }
  }
}

module.exports = { saveDeliveryQuotes };
