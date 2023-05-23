const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/database");
const { Pool } = require("pg");

const userRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

app.use(express.json());
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    // Look up user in the db
    console.log("this is being executed");
    db.query(
      "SELECT id, username, password from users where username=$1",
      [username],
      (err, user) => {
        // If there's an error in db lookup,
        // return err callback function
        if (err) return done(err);

        // If user not found,
        // return null and false in callback
        if (!user) return done(null, false);

        // If user found, but password not valid,
        // return err and false in callback
        if (user.rows[0].password != password) return done(null, false);

        // If user found and password valid,
        // return the user object in callback
        return done(null, user);
      }
    );
  })
);

passport.serializeUser((user, done) => {
  console.log("serialize user is executing");
  done(null, user.rows[0].id);
});

passport.deserializeUser(function (id, done) {
  db.query(
    "SELECT id, username FROM users WHERE id = $1",
    [parseInt(id, 10)],
    (err, results) => {
      if (err) {
        return done(err);
      }

      done(null, results.rows[0]);
    }
  );
});

app.listen(3000, () => {
  console.log(`App running on port 3000.`);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
  res.send("E-Commerce Project");
});

// User Routes
app.get("/users", userRoutes.getUsers);
app.get("/users/:id", userRoutes.getUsersById);
app.post("/users", userRoutes.createUser);
app.get("/user", userRoutes.getUser);
app.put("/user/:id", userRoutes.updateUser);
app.delete("/user/:id", userRoutes.deleteUser);

// User Authentication Route
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.send({ message: "Login successful." });
    // res.redirect("profile"); this will become the home screen for logged in users on frontend
  }
);

// Products Routes
app.get("/products", productsRoutes.getProducts);
app.get("/products/:id", productsRoutes.getProductById);

// Cart Routes
app.get("/cart/:id", cartRoutes.getCartById);
// app.post("/cart/:addItem", cartRoutes.addItemToCart);
// app.delete("/cart/:deleteItem", cartRoutes.deleteCart

// Order Routes
app.get("/order/:id", orderRoutes.getOrderById);
