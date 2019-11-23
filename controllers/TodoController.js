const TodoRepository = require("../repositories/TodoRepository");

module.exports = {
  create: function(req, res) {
    // payload for creating todos
    const payload = {
        "title": req.body.text,
        "status": req.body.status,
        "bucket": req.body.bucketId         
    } 

    const userId = req.user.id
    TodoRepository.create(payload, userId, req.app.db)
      .then(result => {
        res.send({
            status: true,
            message: "Todo item is created.",
            todo: result
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          status: false,
          message
        });
      });
  },

  getTodoList: function (req, res) {
    const userId  = req.user.id;
    const data = {
      "bucketId" : req.params.bucketId
    } 
    TodoRepository.all(data ,userId)
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
                message: "no list found"
            })

        })
  },
  
  updateTodoList: function (req, res) {
    const userId = req.user.id; 
    const data =  {...req.body};
    TodoRepository.update(data.id, data)
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
                message: "no list found"
            })

        })
  },

  deleteTodoList: function(req, res) {
    var data = req.body.id;
    TodoRepository.delete(data)
      .then(result => {
        res.send({
          status: true,
          message: "Todo Deleted"
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
