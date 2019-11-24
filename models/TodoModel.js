const mongoose = require("mongoose");

const TodoModel = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, required: true },
  created_at: Date,
  bucket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bucket"
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("todo", TodoModel);