const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    note: String,
  },
  {
    timestamps: true,
  }
);

const NoteSchema = mongoose.model("note", noteSchema);
module.exports = NoteSchema;
