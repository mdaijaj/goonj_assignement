const express = require("express");
var bodyParser = require('body-parser')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// database
const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db success...");
  }).catch((err) => {
    console.log("Failed to sync db...", err.message)
  })


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Atpl Question bank." });
});

// routes
require('./route/index')(app);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is lister this port ${PORT}`);
});