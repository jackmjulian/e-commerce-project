const db = require("../database/database");

// Get cart by id
const getCartById = (req, res) => {
  const { id } = req.params;
  db.query(`Select * from cart where id = ${id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

//Add single product to cart with quanity and it
const addItemToCart = (req, res) => {};

//Remove single product to cart with quanity and it
const removeItemFromCart = (req, res) => {};

//Checkout cart and get payment information, this will be pushed into as order
const checkoutCart = (req, res) => {};


module.exports = {
  getCartById,
};
