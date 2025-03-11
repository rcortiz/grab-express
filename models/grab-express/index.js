import { Quote } from "./quote-model.js";
import { Package } from "./package-model.js";

Quote.hasMany(Package, {
  foreignKey: "quoteId",
  as: "package",
});
Package.belongsTo(Quote, {
  foreignKey: "quoteId",
  as: "quote",
});

export { Quote, Package };
