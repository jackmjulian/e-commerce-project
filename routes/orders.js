const db = require("../database/database");

// Get order by id
const getOrderById = (req, res) => {
  const { id } = req.params;
  db.query(`Select * from orders where id = ${id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

//Needs to be completed after cart routes
const getOrderByUser = (req, res) => {
  const { user_id } = req.params;
  db.query(`Select * from orders where user_id = ${user_id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

module.exports = {
  getOrderById,
  getOrderByUser,
};
