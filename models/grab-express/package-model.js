import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.js";

import { Quote } from "./quote-model.js";

export class Package extends Model {}

Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quoteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quote,
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
    sequelize,
    modelName: "Package",
    underscored: true,
  }
);
