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

module.exports = {
  getOrderById,
};
