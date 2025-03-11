import { Quote } from "../models/grab-express/quote-model.js";

import _ from "lodash";

export class DeliveriesService {
  static async saveDeliveryQuotes(data) {
    try {
      const { quotes, origin, destination, packages } = data;

      const quoteData = await Quote.create({
        serviceType: quotes[0].service.type,
        serviceName: quotes[0].service.name,
        currencyCode: quotes[0].currency.code,
        currencySymbol: quotes[0].currency.symbol,
        currencyExponent: quotes[0].currency.exponent,
        amount: quotes[0].amount,
        estimatedPickup: quotes[0].estimatedTimeline.pickup,
        estimatedDropoff: quotes[0].estimatedTimeline.dropoff,
        distance: quotes[0].distance,
        originAddress: origin.address,
        originCityCode: origin.cityCode,
        originLatitude: origin.coordinates.latitude,
        originLongitude: origin.coordinates.longitude,
        destinationAddress: destination.address,
        destinationCityCode: destination.cityCode,
        destinationLatitude: destination.coordinates.latitude,
        destinationLongitude: destination.coordinates.longitude,
        packages: _.map(packages, (pkg) => ({
          name: pkg.name,
          description: pkg.description,
          quantity: pkg.quantity,
          price: pkg.price,
        })),
      });
      return quoteData;
    } catch (error) {
      console.error("Error in creating quotes", error);
      throw error;
    }
  }

  static async fetchDeliveyQuotesById(data) {
    try {
      const quoteData = await Quote.findByPk(data);
      return quoteData.amount;
    } catch (error) {
      console.error("Error fetching delivery quotes by id", error);
      throw error;
    }
  }
}
