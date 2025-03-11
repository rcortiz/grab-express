import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.js";

export class Quote extends Model {}

Quote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencySymbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyExponent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estimatedPickup: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estimatedDropoff: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    originAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originCityCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originLatitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    originLongitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    destinationAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destinationCityCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destinationLatitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    destinationLongitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Quote",
    timestamps: true,
    underscored: true,
  }
);
