// // To be updated with all user routes once complete
// const express = require("express");
// const router = express.Router();
// const db = require("../index");
// // const app = express();
// // const bodyParser = require("body-parser");
// // const cors = require("cors");

// // app.use(cors());
// // app.use(express.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // Get all users
// router.get("/users", (req, res) => {
//   const getUsers = `Select * from users`;
//   db.query(getUsers, (err, result) => {
//     console.log("err", err);
//     console.log("result", result.rows);
//     res.send(result.rows);
//   });
// });

// // Get user by id
// router.get("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const getUserById = `Select * from users where id = ${id}`;
//   db.query(getUserById, (err, result) => {
//     res.send(result.rows);
//   });
// });

// module.exports = router;
