const { Cart, Product } = require("../models");

// Public: Add to cart
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const total_price = product.price * quantity;

    const newCart = await Cart.create({
      product_id,
      quantity,
      total_price,
      is_checked_out: false,
    });

    res.status(201).json({
      message: "Product added to cart",
      cart: {
        id: newCart.id,
        product_id: newCart.product_id,
        product_name: product.name,
        quantity: newCart.quantity,
        unit_price: product.price,
        total_price: newCart.total_price,
        is_checked_out: newCart.is_checked_out,
        createdAt: newCart.createdAt,
        updatedAt: newCart.updatedAt,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
};

// Admin: Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
    });

    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching carts" });
  }
};

// Admin: Delete cart by ID
const deleteCartById = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: "Cart item not found" });

    await cart.destroy();
    res.json({ message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting cart item" });
  }
};

module.exports = {
  addToCart,
  getAllCarts,
  deleteCartById,
};
