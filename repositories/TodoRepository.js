const bcrypt = require("bcrypt-nodejs");
const tokenFile = require("../config/verifyToken");

module.exports = {
  getTodo: (data ,userId, dbCon) => {
    return new Promise((resolve, reject) => {
      var getTodoQuery = "SELECT todo.text,todo.id,todo.status,bucket.bucketName FROM todo INNER JOIN bucket ON bucket.bucketId = todo.bucketId AND todo.bucketId = ?" ;
      console.log(getTodoQuery);
      dbCon.query(getTodoQuery, [data.bucketId], function (err, todo) {
          if (err) {
              console.log("Invalid data", err);
              throw err;
          }
          else {
              resolve(todo);
          }
      })
  });
  },

  createTodo: (data, userId, dbCon) => {
    return new Promise((resolve, reject) => {
      var insertQuery = "INSERT INTO todo (`userId`, `text`, `status`, `bucketId`) VALUES ('" + userId + "','" + data.text + "','" + data.status + "','" + data.bucketId + "' )";
      dbCon.query(insertQuery, function (err, result) {
        console.log(err, result);
        if (err) {
            console.log("err in creating Todo data", err);
            throw err;
        }
        else {
            resolve(result);
        }
      })
    });
  },

  updateTodo: (data, userId, dbCon) => {
    return new Promise((resolve, reject) => {
        let todoId = data.id;
        delete data.id;
        let keys = Object.keys(data);
        // creating array of updated values
        let values = keys.map((k) => data[k])
        values.push(todoId); // pushing todoId
        values.push(userId);  // pushing userId
        var updateQuery = "UPDATE todo SET " + keys.map(k => `${k} = ?`).join(", ") + " WHERE id = ? AND userId = ?";
        dbCon.query(updateQuery, values,  function (err, result) {
            console.log(err, result);
            if (err) {
                console.log("err in updating data", err);
                throw err;
            }
            else if(result.affectedRows) {
                resolve(result.affectedRows);
            }
          })  
    });
  },

  deleteTodo: (todoId, userId, dbCon) => {
    return new Promise((resolve, reject) => {
        var deleteUserQuery = "DELETE FROM todo WHERE id = ? AND userId = ? " ;
        dbCon.query(deleteUserQuery, [todoId, userId], function (err, result) {
            console.log(err,result);
            if (err) {
                console.log("err in deleting data", err);
                throw err;
            }
            else {
                resolve(result);
            }
        })
    });
  }

};
