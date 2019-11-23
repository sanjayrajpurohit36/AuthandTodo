const UserRepository = require("../repositories/UserRepository");

module.exports = {
  getUser: function(userData, res) {
    const { email } = userData;
    UserRepository.getUserData(email, req.app.db)
      .then(result => {
        res.send({
          status: true,
          data: result
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          success: false,
          message
        });
      });
  },

  login: function(req, res) {
    const { email, password } = req.body;
    UserRepository.login(email, password, req.app.db)
      .then(result => {
        res.send({
          status: true,
          data: result
        });
      })
      .catch(message => {
        res.status(200);
        res.send({
          status: false,
          message
        });
      });
  },

  logout: function(req, res) {
    const userId = req.user.id;
    UserRepository.logout(userId)
      .then(result => {
        res.send({
          status: true,
          message: "user is logged out"
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          success: false,
          message
        });
      });
  },

  signup: function(req, res) {
    var data = req.body;
    // check whether email already exists in DB (if not then allow for signIn)
    UserRepository.getUserData(data.email)
      .then(resData => {
        console.log(resData);
        if (!resData) {
          UserRepository.create(data)
            .then(result => {
              // logging in user after signup
              UserRepository.login(data.email, data.password)
                .then(result => {
                  res.send({
                    status: true,
                    data: result
                  });
                })
                .catch(message => {
                  res.status(422);
                  res.send({
                    status: false,
                    message: message
                  });
                });
            })
            .catch(message => {
              res.status(422);
              res.send({
                status: false,
                message: message
              });
            });
        } else {
          res.send({
            status: false,
            message: "Email already exist in system"
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },

  update: function(req, res) {
    var userId = req.user.id;
    var email = req.user.email;
    var data = req.body;

    UserRepository.update(data, userId, req.app.db)
      .then(result => {
        //sending users's updated data
        UserRepository.getUserData(email, req.app.db)
          .then(result => {
            res.send({
              status: true,
              data: result
            });
          })
          .catch(message => {
            res.status(422);
            res.send({
              status: false,
              message: message
            });
          });
      })
      .catch(message => {
        res.send({
          status: false,
          message
        });
      });
  },

  // user delete function NIU(Not in use)
  delete: function(req, res) {
    var id = req.params.id;
    UserRepository.delete(id)
      .then(result => {
        res.send({
          status: true
        });
      })
      .catch(message => {
        res.send({
          status: false,
          message
        });
      });
  }
};
