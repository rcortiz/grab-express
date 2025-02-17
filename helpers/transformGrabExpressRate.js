function transformToShopifyRates(grabExpressResponse) {
  if (
    !grabExpressResponse ||
    !grabExpressResponse.quotes ||
    grabExpressResponse.quotes.length === 0
  ) {
    console.error("No valid quotes found in Grab Express response.");
    return { rates: [] };
  }

  return {
    rates: grabExpressResponse.quotes.map((quote) => ({
      service_name: "Grab Express",
      service_code: "GRAB_EXPRESS",
      total_price: quote.amount * 100,
      currency: "PHP",
      min_delivery_time: quote.estimatedTimeline?.minTime || 30,
      max_delivery_time: quote.estimatedTimeline?.maxTime || 60,
    })),
  };
}

module.exports = transformToShopifyRates;
