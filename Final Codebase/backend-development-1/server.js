const app = require("./src/app");

const port = 3000;

app.get("/", (req, res) => {
  res.send("Server is LIVE");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
