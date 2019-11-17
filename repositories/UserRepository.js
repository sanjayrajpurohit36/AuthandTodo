const bcrypt = require("bcrypt-nodejs");
const tokenFile = require("../config/verifyToken");

module.exports = {
    getUserData: (email, dbCon) => {
        return new Promise((resolve, reject) => {
            console.log("inside get userData",email);
            var getUserQuery = "SELECT * FROM users WHERE email = ? " ;
            dbCon.query(getUserQuery, [email], function (err, user) {
                console.log(err, user)
                if (err) {
                    console.log("Invalid data(email)", err);
                    throw err;
                }
                else if (user.length == 0) {
                           resolve({
                               status: "No user found"
                           }) 
                } 
                else {
                    resolve({
                        "token": user[0].token,
                        "name" : user[0].name,
                        "email": user[0].email
                    });
                }
            })
        })
    },

    login: (email, password, dbCon) => {
        return new Promise((resolve, reject) => {
            var getUserQuery = "SELECT * FROM users WHERE email = ? " ;
            dbCon.query(getUserQuery, [email], function (err, user) {
                if (err) {
                    console.log("Invalid data(email)", err);
                    throw err;
                }
                else if(user.length != 0) {
                    if (user && bcrypt.compareSync(password, user[0].password)) {
                        let token = tokenFile.generateToken(user[0]); // generating token
                        var updateQuery = "UPDATE users SET token = ? WHERE userId = ?";
                        dbCon.query(updateQuery, [token,user[0].userId],  function (err, result) {
                            if (err) {
                            console.log("err in inserting data", err);
                            throw err;
                            }
                        }) 

                        resolve({
                            "token": token,
                            "name" : user[0].name,
                            "email": user[0].email
                        });

                    } else reject("Incorrect credentials"); // if password doesn't match
                } else reject("Incorrect credentials");     // if email doesn't exist in system
            })
        });
    },

    logout: (userId, dbCon) => {
      return new Promise((resolve, reject) => {
        var updateQuery = "UPDATE users SET token = ? WHERE userId = ?";
        dbCon.query(updateQuery, ["",userId],  function (err, result) {
            if (err) {
            console.log("err in unsetting token data", err);
            throw err;
            }
            else if(result.changedRows) {
                resolve({
                    status: "true",
                    message: "user is loggedOut"
                });
            }
        }) 
      })    
    },

    create: (data, dbCon) => {
        return new Promise((resolve, reject) => {
        console.log("name", data);
        var hashedPassword =  bcrypt.hashSync(data.password);
        var insertQuery = "INSERT INTO users (`name`, `email`, `password`) VALUES ('" + data.name + "','" + data.email + "','" + hashedPassword + "' )";
        dbCon.query(insertQuery, function (err, result) {
            if (err) {
                console.log("err in inserting data", err);
                throw err;
            }
            else {
                resolve(result);
            }
        })
        });
    },

    update: (data, userId, dbCon) => {
        return new Promise((resolve, reject) => {
            let keys = Object.keys(data);
            // checking if updated data has password or not
            keys.indexOf("password") ? data.password = bcrypt.hashSync(data.password) : "";  
            // creating array of updated values
            let values = keys.map((k) => data[k])
            values.push(userId); // this needs to be done
            var updateQuery = "UPDATE users SET " + keys.map(k => `${k} = ?`).join(", ") + " WHERE userId = ?";
            // console.log("update query",updateQuery);
            // console.log("values", values);
            dbCon.query(updateQuery, values,  function (err, result) {
                console.log(err, result);
                if (err) {
                    console.log("err in updating data", err);
                    throw err;
                }
                else if(result.changedRows) {
                    resolve(result);
                }
            })  
        });
    },

    delete: id => {
        return new Promise((resolve, reject) => {
            var deleteUserQuery = "DELETE FROM users WHERE userId = ? " ;
            dbCon.query(deleteUserQuery, [id], function (err, result) {
                if (err) {
                    console.log("err in deleting data", err);
                    throw err;
                }
                else {
                    resolve(result);
                }
            })
        });
    },

    find_by_token: (token, dbCon) => {
        return new Promise((resolve, reject) => {
            var getUserQuery = "SELECT * FROM users WHERE token = ? " ;
            dbCon.query(getUserQuery, [token], function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    resolve(result[0]);
                }
            })
        });
    }
};
