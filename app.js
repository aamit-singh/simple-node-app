const express = require("express");
const mongoose = require("mongoose");
const DbItem = require("./models/dbitem");

// Express App
const app = express();

// connecting to mongodb
const dbURI =
  "mongodb+srv://simple-node-app:Password@cluster0-euwxx.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
    app.listen(5000);
  })
  .catch((err) => console.log(err));

// middleware
app.use(express.static("public"));

// register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const list = ["car 1", "car 2", "car 3"];

  res.render("index", { name: "Rex", list });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(400).render("404");
});
