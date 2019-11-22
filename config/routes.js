const UsersController = require("../controllers/UsersController.js");
const TodoController = require("../controllers/TodoController.js");
const BucketController = require("../controllers/BucketController");
const TokenFile = require("./VerifyToken");
const path = require("path");

module.exports = function(app,db) {
  // un-authenticated routes
  app.post("/signup", UsersController.signup);
  app.post("/login",  UsersController.login);
  // User
  app.post("/logout", TokenFile.verifyToken, UsersController.logout);
  app.put("/user", TokenFile.verifyToken ,UsersController.update);

  // Todo
  app.post("/todo", TokenFile.verifyToken, TodoController.create)
  app.get("/todo/:bucketId/", TokenFile.verifyToken, TodoController.getTodoList)
  app.put("/todo", TokenFile.verifyToken, TodoController.updateTodoList)
  app.post("/todo/delete", TokenFile.verifyToken, TodoController.deleteTodoList)

  // Bucket
  app.get("/bucket", TokenFile.verifyToken, BucketController.getBucketList)
  app.post("/bucket", TokenFile.verifyToken, BucketController.create)
  app.put("/bucket", TokenFile.verifyToken, BucketController.updateBucket)
};
