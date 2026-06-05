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

// To Delete a Note:
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id >= notes.length || id < 0) {
    return res.status(404).json({
      message: "Note not found.",
    });
  }

  notes.splice(id, 1);

  res.status(200).json({
    message: "Note deleted successfully!",
    data: notes,
  });

  console.log(notes);
  console.log(notes.length);
  console.log(id);
});

module.exports = app;
