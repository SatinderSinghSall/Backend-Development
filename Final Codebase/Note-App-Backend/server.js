const app = require("./src/app");

const port = 3000;

app.get("/", (req, res) => {
  res.send("Server's Backend is LIVE 🟢");
});

app.listen(port, () => {
  console.log(`Server's backend is running on port: ${port}`);
});
