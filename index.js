const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("The server is running here.");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});
