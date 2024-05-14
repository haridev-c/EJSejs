const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

mongoose.connect("mongodb://localhost:27017/avodhaEjs");

const userSchema = mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const user = new User({
    name: req.body.name,
  });

  user
    .save()
    .then((result) => res.json("User saved successfully"))
    .catch((err) => console.log(err));
});

app.listen(8888, () => {
  console.log("server listening at http://localhost:8888");
});
