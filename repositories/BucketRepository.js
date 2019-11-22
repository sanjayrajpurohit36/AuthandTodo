const tokenFile = require("../config/verifyToken");

module.exports = {
  getBucket: (userId, dbCon) => {
    return new Promise((resolve, reject) => {
        var getTodoQuery = "SELECT * FROM bucket WHERE userId = ? " ;
        dbCon.query(getTodoQuery, [userId], function (err, todo) {
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

  createBucket: (data, userId, dbCon) => {
    return new Promise((resolve, reject) => {
      var insertQuery = "INSERT INTO bucket (`userId`, `bucketName`) VALUES ('" + userId + "','" + data.bucketName + "' )";
      dbCon.query(insertQuery, function (err, result) {
        console.log(err, result);
        if (err) {
            console.log("err in creating Bucket", err);
            throw err;
        }
        else {
            resolve(result);
        }
      })
    });
  },

  updateBucket: (data, userId, dbCon) => {
    return new Promise((resolve, reject) => {
        let bucketId = data.bucketId;
        delete data.bucketId;
        let keys = Object.keys(data);
        // creating array of updated values
        let values = keys.map((k) => data[k])
        values.push(bucketId); // pushing todoId
        values.push(userId);  // pushing userId
        var updateQuery = "UPDATE bucket SET " + keys.map(k => `${k} = ?`).join(", ") + " WHERE bucketId = ? AND userId = ?";
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
  }

};
