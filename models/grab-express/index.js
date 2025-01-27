const Quote = require("./quote-model");
const Package = require("./package-model");

Quote.hasMany(Package, {
  foreignKey: "quoteId",
  as: "package",
});
Package.belongsTo(Quote, {
  foreignKey: "quoteId",
  as: "quote",
});

module.exports = {
  Quote,
  Package,
};
