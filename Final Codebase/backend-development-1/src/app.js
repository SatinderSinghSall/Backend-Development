const express = require("express");

const app = express();

const notes = [];

app.use(express.json());

// To create a new note:
app.post("/notes", (req, res) => {
  const { title, description } = req.body;

  // Validation
  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required.",
    });
  }

  // Create note
  const note = {
    title,
    description,
  };

  notes.push(note);

  res.status(201).json({
    message: "Note created successfully!",
    data: note,
  });
});

// To view all notes:
app.get("/notes", (req, res) => {
  if (notes.length === 0) {
    return res.status(404).json({
      message: "No notes found.",
    });
  }

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
});

// To Update a Note:
app.patch("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id >= notes.length || id < 0) {
    return res.status(404).json({
      message: "Note not found.",
    });
  }

  const { title, description } = req.body;

  if (title) {
    notes[id].title = title;
  }

  if (description) {
    notes[id].description = description;
  }

  res.status(200).json({
    message: "Note updated successfully!",
    data: notes[id],
  });
});

module.exports = app;
