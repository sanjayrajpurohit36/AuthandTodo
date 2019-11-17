const TodoRepository = require("../repositories/TodoRepository");

module.exports = {
  create: function(req, res) {
    // payload for creating todos
    const payload = {
        "text": req.body.text,
        "status": req.body.status         
    } 

    const userId = req.user.id
    TodoRepository.createTodo(payload, userId, req.app.db)
      .then(result => {
        res.send({
            status: true,
            message: "Todo item is created." 
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
    const pageNo = req.params.pageNo;
    const limit = req.params.limit
    const from = pageNo * limit
    TodoRepository.getTodo(userId, req.app.db)
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
    TodoRepository.updateTodo(data, userId ,req.app.db)
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
    var userId = req.user.id;
    var data = req.body.id;
    TodoRepository.deleteTodo(data, userId, req.app.db)
      .then(result => {
        res.send({
          status: true,
          message: "todo Deleted"
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
