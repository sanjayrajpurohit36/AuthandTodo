const jwt = require("jsonwebtoken");
const User = require("../repositories/UserRepository");

module.exports = { 
    
  verifyToken: (req, res, next) => {
    // console.log("req coming in verify token middleware", req);
    var token = req.headers["x-access-token"];
    if (!token)
        return res
        .status(403)
        .send({ success: false, 
            message: "User dosen't exist. Plz register & then login."
        });
    User.find_by_token(token, req.app.db)
        .then(userData => {
        req["user"] = { id: userData._id, email: userData.email }
        next();
        })
        .catch(err => {
        res.status(422).send({ auth: false, message: "Need to login." });
        });
    }
}

