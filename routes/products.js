const db = require("../database/database");

// // Get all products
const getProducts = (req, res) => {
  db.query(`Select * from products`, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

// Get product by id
const getProductById = (req, res) => {
  const { id } = req.params;
  db.query(`Select * from products where id = ${id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

module.exports = {
  getProducts,
  getProductById,
};
