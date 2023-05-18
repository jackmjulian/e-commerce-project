const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

// const userRoute = require("./routes/users");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "E-Commerce_Project",
  password: "postgres",
  port: 5432,
});

app.listen(3000, () => {
  console.log(`App running on port 3000.`);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
  res.send("E-Commerce_Project");
});

// app.use("/users", userRoute);
// app.use("/users/:id", userRoute);

//Register new user - notworking
// app.post("/register", (req, res) => {
//   const { password, username } = req.body;
//   const insertStmt = "INSERT INTO users(password,username) VALUES (?,?)";
//   db.query(insertStmt, [password, username], function (err, result) {
//     if (err) {
//       res.status(500).send({ error: err.message });
//     } else {
//       res.send({
//         // id: this.lastID,
//         password,
//         username,
//       });
//     }
//   });
// });

//Register new user attempt 2
app.post("/register", (req, res) => {
  const { id, password, username } = req.body;
  db.query(
    "INSERT INTO users (id, password, username) VALUES ($1, $2) RETURNING *",
    [id, password, username],
    (err, result) => {
      if (err) {
        throw err;
      }
      response.status(201).send(`User added`);
    }
  );
});

// Get all users
app.get("/users", (req, res) => {
  const getUsers = `Select * from users`;
  db.query(getUsers, (err, result) => {
    console.log("err", err);
    console.log("result", result.rows);
    res.send(result.rows);
  });
});

// Get user by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const getUserById = `Select * from users where id = ${id}`;
  db.query(getUserById, (err, result) => {
    res.send(result.rows);
  });
});

// // Update a user by id
// app.put("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const { username, password } = req.body;
//   const updateUserById = `Update * from users set username = ?, password = ? where id = ?`;
//   db.query(getUsersById, [username, password, id], (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     res.send(result);
//   });
// });

//////////////////////////////////////////////////////////////////////////////////////////////

// Get all products
app.get("/products", (req, res) => {
  const getProducts = `Select * from products`;
  db.query(getProducts, (err, result) => {
    // console.log("err", err);
    // console.log("result", result.rows);
    result
      ? res.status(200).send(result.rows)
      : res.status(404).send("Products not Found");
  });
});

//Get product by id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const getProductById = `Select * from products where id = ${id}`;
  db.query(getProductById, (err, result) => {
    result
      ? res.status(200).send(result.rows)
      : res.status(404).send(err, `Product with ${id} not Found`); //Need to fix this error
  });
});

////////////////////////////////////////////////////////////////////////////////////////////
