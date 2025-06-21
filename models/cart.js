"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  Cart.init(
    {
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      is_checked_out: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );

  return Cart;
};
