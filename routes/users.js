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
    if (!result) {
      res.status(404).send("User not found");
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

// User login - to be replaced with login authentication
const userLogin = async (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT (username, password) from users WHERE VALUES ($1, $2) RETURNING *",
    [username, password],
    (err, result) => {
      if (!result.username) {
        res.status(401).send("Incorrect username or password");
      } else if (!result.password === password) {
        res.status(401).send("Incorrect username or password");
      } else {
        res.status(200).send(result.rows);
      }
    }
  );
};

const getUser = async (req, res) => {
  const { username: username, password: password } = req.body;
  db.query(
    `SELECT id, username, password from users WHERE username=$1 and password=$2`,
    [username, password],
    (err, user) => {
      if (err) {
        throw err;
      }
      res.status(200).send(user.rows[0]);
    }
  );
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  db.query(
    `UPDATE users SET username=$1, password=$2 WHERE ID=$3`,
    [username, password, id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  db.query("DELETE FROM users WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUser,
  getUsers,
  getUsersById,
  createUser,
  userLogin,
  updateUser,
  deleteUser,
};
