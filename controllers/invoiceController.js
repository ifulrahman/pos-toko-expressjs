const { Cart, Product, Invoice } = require("../models");

const generateInvoiceNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 10000);
  return `INV-${date}-${random}`;
};

const checkout = async (req, res) => {
  try {
    const { cart_ids } = req.body;
    if (!Array.isArray(cart_ids) || cart_ids.length === 0) {
      return res.status(400).json({ message: "Cart ID list is required" });
    }

    const carts = await Cart.findAll({
      where: {
        id: cart_ids,
        is_checked_out: false,
      },
      include: [{ model: Product, as: "product" }],
    });

    if (carts.length === 0)
      return res.status(404).json({ message: "No valid carts found" });

    const items = carts.map((cart) => {
      return {
        product_id: cart.product_id,
        product_name: cart.product.name,
        unit_price: cart.product.price,
        quantity: cart.quantity,
        total_price: cart.total_price,
      };
    });

    const total_price = items.reduce((sum, item) => sum + item.total_price, 0);
    const invoice_number = generateInvoiceNumber();

    const invoice = await Invoice.create({
      invoice_number,
      total_price,
      items: JSON.stringify(items),
    });

    await Cart.update({ is_checked_out: true }, { where: { id: cart_ids } });

    res.status(201).json({
      message: "Checkout successful",
      invoice,
    });
  } catch (err) {
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: "Error fetching invoices" });
  }
};

const deleteInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    await invoice.destroy();
    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting invoice" });
  }
};

module.exports = {
  checkout,
  getAllInvoices,
  deleteInvoiceById,
};
