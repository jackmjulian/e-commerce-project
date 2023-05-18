const db = require("../database/database");

const getCartById = (req, res) => {
  const { id } = req.params;
  db.query(`Select * from cart where id = ${id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

module.exports = {
  getCartById,
};
