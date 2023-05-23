// const express = require("express");
// const app = express();
// const db = require("../database");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");

// app.use(
//   session({
//     secret: "secret-key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     // Look up user in the db
//     console.log("this is being executed");
//     db.query(
//       "SELECT id, username, password from users where username=$1",
//       [username],
//       (err, user) => {
//         // If there's an error in db lookup,
//         // return err callback function
//         if (err) return done(err);

//         // If user not found,
//         // return null and false in callback
//         if (!user) return done(null, false);

//         // If user found, but password not valid,
//         // return err and false in callback
//         if (user.rows[0].password != password) return done(null, false);

//         // If user found and password valid,
//         // return the user object in callback
//         return done(null, user);
//       }
//     );
//   })
// );

// passport.serializeUser((user, done) => {
//   console.log("serialize user is executing");
//   done(null, user.rows[0].id);
// });

// passport.deserializeUser(function (id, done) {
//   db.query(
//     "SELECT id, username FROM users WHERE id = $1",
//     [parseInt(id, 10)],
//     (err, results) => {
//       if (err) {
//         return done(err);
//       }

//       done(null, results.rows[0]);
//     }
//   );
// });

// module.exports = {
// };
