const Bucket = require("../models/BucketModel");

module.exports = {
  all: userId => {
    console.log("userId", userId)
    return Bucket.find({ user: userId}).populate("user", "name");
  },

  find: id => {
    return Bucket.find({ _id: id }).populate("todo");
  },

  create: data => {
    var bucket = new Bucket(data);
    return bucket.save();
  },

  update: (id, data) => {
    return Bucket.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...data }
      }
    );
  },

  delete: id => {
    return Bucket.deleteOne({ _id: id });
  }
};