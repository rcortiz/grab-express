const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Quote = sequelize.define(
  "Quote",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    service_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency_exponent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estimated_pickup: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estimated_dropoff: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    origin_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin_city_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin_latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    origin_longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    destination_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination_city_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination_latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    destination_longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Quote;
