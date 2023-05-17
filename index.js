const express = require("express");
const app = express();

const db = require("./routes/users");

app.get("/users", db.getUsers);
