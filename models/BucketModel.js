const mongoose = require("mongoose");

// schema options
const options = {
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt : 'updatedAt'
    }
}

const BucketModel = new mongoose.Schema({
  bucketName: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, options);

module.exports = mongoose.model("bucket", BucketModel);
