const express = require("express");

const app = express();

const notes = [];

app.use(express.json());

// To create a new note:
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({ message: "Notes created successfully!" });
});

// To view all notes:
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes fetched successfully!",
    count: notes.length,
    data: notes,
  });
});

module.exports = app;
