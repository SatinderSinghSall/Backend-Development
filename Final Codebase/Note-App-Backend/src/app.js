const express = require("express");

const noteModel = require("./models/note.model");

const app = express();

app.use(express.json());

// Route: Get all Notes:
app.get("/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();

    res.status(200).json({
      message: "Notes fetched successfully!",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
});

// Route: Get a single Note:
app.get("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await noteModel.findById(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note fetched successfully!",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch note",
      error: error.message,
    });
  }
});

// Route: Update a Note:
app.put("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const { title, description } = req.body;

    // Validations:
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        message: "Title must be at least 3 characters long",
      });
    }

    if (description.length < 5) {
      return res.status(400).json({
        message: "Description must be at least 5 characters long",
      });
    }

    const updatedNote = await noteModel.findByIdAndUpdate(
      noteId,
      {
        title,
        description,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note updated successfully!",
      note: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update note",
      error: error.message,
    });
  }
});

// Route: Delete a Note:
app.delete("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const deletedNote = await noteModel.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully!",
      note: deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
});

module.exports = app;
