const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
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
    userRoutes.getUser(username, (err, user) => {
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
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.rows[0].username);
});

passport.deserializeUser((username, done) => {
  // Look up user id in database.
  userRoutes.getUser(username, function (err, user) {
    if (err) return done(err);
    done(null, user);
  });
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

// User Routes
app.get("/users", userRoutes.getUsers);
app.get("/users/:id", userRoutes.getUsersById);
app.post("/users", userRoutes.createUser);
// app.post("/login", userRoutes.userLogin);
app.get("/user", userRoutes.getUser);

// app.post('/login', passport.authenticate('local'), (req, res) => {
//   res.json({ message: 'Login successful.' });
// });

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

// Order Routes
app.get("/order/:id", orderRoutes.getOrderById);
