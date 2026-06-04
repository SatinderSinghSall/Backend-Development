const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! Server is LIVE");
});

app.get("/about-us", (req, res) => {
  res.send("About Us:");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
