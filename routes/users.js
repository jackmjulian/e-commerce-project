const app = express();
const express = require("express");
const router = express.Router();

module.exports = (app) => {
  app.use("/users", router);

  app.get("/", (req, res, next) => {
    res.status(200).send(response);
  });
};
