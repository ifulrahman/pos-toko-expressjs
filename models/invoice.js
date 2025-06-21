"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {}

  Invoice.init(
    {
      invoice_number: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
      items: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
