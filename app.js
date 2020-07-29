const express = require("express");

// Express App
const app = express();

// listen for requests
app.listen(5000, () => {
  console.log("express server listening to port 5000");
});

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(400).sendFile("./views/404.html", { root: __dirname });
});
