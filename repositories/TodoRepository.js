const Todo = require("../models/TodoModel");

module.exports = {
  all: (data, userId) => {
    console.log(data, userId);
    return Todo.find({ bucket: data.bucketId }).populate(
      "bucket",
      ["_id", "bucketName"],
    );
  },

  find: id => {
    return Todo.find({ _id: id }).populate("bucket", "_id");
  },

  create: data => {
    var todo = new Todo(data);
    return todo.save();
  },

  update: (id, data) => {
    return Todo.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...data }
      }
    );
  },

  delete: id => {
    return Todo.deleteOne({ _id: id });
  }
};
