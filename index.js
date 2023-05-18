const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const userRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

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

// User Routes
app.get("/users", userRoutes.getUsers);
app.get("/users/:id", userRoutes.getUsersById);
app.post("/users", userRoutes.createUser);

// Products Routes
app.get("/products", productsRoutes.getProducts);
app.get("/products/:id", productsRoutes.getProductById);

// Cart Routes
app.get("/cart/:id", cartRoutes.getCartById);

// Order Routes
app.get("/order/:id", orderRoutes.getOrderById);
