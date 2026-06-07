require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

const port = 3000;

app.get("/", (req, res) => {
  res.send("Server's Backend is LIVE 🟢");
});

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server's backend is running on port: ${port}`);
  });
}

startServer();
