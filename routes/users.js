const db = require("../database/database");

// Get all users
const getUsers = (req, res) => {
  db.query(`Select * from users`, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

// Get user by id
const getUsersById = (req, res) => {
  const { id } = req.params;
  db.query(`Select * from users where id = ${id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

// Create a new user
const createUser = (req, res) => {
  const { username, password } = req.body;
  db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(201).send({ password, username });
      }
    }
  );
};

// app.post("/register", (req, res) => {
//   const { password, username } = req.body;
//   const insertStmt = "INSERT INTO users(password,username) VALUES ($1,$2)";
//   db.query(insertStmt, [password, username], function (err, result) {
//     if (err) {
//       res.status(500).send({ error: err.message });
//     } else {
//       res.send({
//         password,
//         username,
//       });
//     }
//   });
// });

module.exports = {
  getUsers,
  getUsersById,
  createUser,
};
