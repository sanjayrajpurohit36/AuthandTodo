const mongoose = require("mongoose");

// schema options
const options = {
  timestamps: { 
      createdAt: 'createdAt',
      updatedAt : 'updatedAt'
  }
}

const TodoModel = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, required: true },
  bucket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bucket"
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, options);

module.exports = mongoose.model("todo", TodoModel);