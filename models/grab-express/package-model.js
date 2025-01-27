const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Package = sequelize.define(
  "Package",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Quote",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

module.exports = Package;
