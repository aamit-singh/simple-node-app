const express = require("express");

// Express App
const app = express();

// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(5000, () => {
  console.log("express server listening to port 5000");
});

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
