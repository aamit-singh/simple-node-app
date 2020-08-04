const express = require("express");
const mongoose = require("mongoose");
const dbURI = require("./config");
const DiaryEntry = require("./models/diaryEntry");

// Express App
const app = express();

// connecting to mongodb
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
    app.listen(5000);
  })
  .catch((err) => console.log(err));

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const list = [
    "This is a basic node app",
    "It uses express and mongoDb",
    "There is a diary entry service in it.",
  ];

  res.render("index", { name: "Rex", list });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/create-item", (req, res) => {
  const item = new DiaryEntry({
    name: "item 101",
    count: "2",
    date: new Date(),
  });
  item
    .save()
    .then((result) => {
      console.log(result);
      res.send("item created succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(400).render("404");
});
