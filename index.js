const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

mongoose.connect("mongodb://localhost:27017/avodhaEjs");

const userSchema = mongoose.Schema({
  name: String,
  content1: String,
  content2: String,
  file: String,
});

const User = mongoose.model("User", userSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      res.render("index", { users: users });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/submit", upload.single("file"), (req, res) => {
  const user = new User({
    name: req.body.name,
    content1: req.body.content1,
    content2: req.body.content2,
    file: req.file.filename,
  });

  user
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.listen(8888, () => {
  console.log("server listening at http://localhost:8888");
});
