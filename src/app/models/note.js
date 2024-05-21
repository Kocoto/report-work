const mongoose = require("mongoose");

const Note = new mongoose.Schema(
  {
    note: String,
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model("note", Note);
module.exports = NoteModel;
