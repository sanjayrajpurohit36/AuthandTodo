const mongoose = require("mongoose");

const BucketModel = new mongoose.Schema({
  bucketName: { type: String, required: true },
  created_at: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("bucket", BucketModel);
