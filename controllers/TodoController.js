const TodoRepository = require("../repositories/TodoRepository");

module.exports = {
  create: function(req, res) {
    // payload for creating todos
    const payload = {
        "title": req.body.text,
        "status": req.body.status,
        "bucket": req.body.bucketId,
        "createdBy": req.user.id         
    } 

    const userId = req.user.id
    TodoRepository.create(payload, userId, req.app.db)
      .then(result => {
        res.send({
            status: true,
            message: "Todo item is created successfully",
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
                message: "Todo fetched successfully",
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
    const data =  {...req.body};
    TodoRepository.update(data.id, data)
        .then(result => {
            res.send({
                status: true,
                message: "Todo updated successfully",
                data: result
            });
        })
        .catch(message => {
            res.status(422);
            res.send({
                status: false,
                message: "No Todo found"
            })

        })
  },

  deleteTodoList: function(req, res) {
    var data = {id: req.body.id, userId: req.user.id};
    TodoRepository.delete(data)
      .then(result => {
        if(result.deletedCount)
          res.send({
            status: true,
            message: "Todo deleted successfully"
          });
        else 
          res.send({
            status: true,
            message: "No todo found"
          });
      })
      .catch(message => {
        res.send({
          status: false,
          message: message
        });
      });
  }
};
