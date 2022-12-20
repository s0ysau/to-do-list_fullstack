const Todo = require('../../models/todo')

const dataController = {
  // index
  index (req, res, next) {
    Todo.find({}, (err, foundTodos) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todos = foundTodos
        next()
      }
    })
  },
  // delete
  destroy (req, res, next) {
    Todo.findByIdAndDelete(req.params.id, (err, deletedTodo) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todo = deletedTodo
        next()
      }
    })
  },
  // update
  update (req, res, next) {
    req.params.completed = req.body.completed === 'on'
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTodo) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todo = updatedTodo
        next()
      }
    })
  },
  // create
  create (req, res, next) {
    req.params.completed = req.body.completed === 'on'
    Todo.create(req.body, (err, createdTodo) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todo = createdTodo
        next()
      }
    })
  },
  // show
  show (req, res, next) {
    Todo.findById(req.params.id, (err, foundTodos) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a fruit with that ID'
        })
      } else {
        res.locals.data.todo = foundTodos
        next()
      }
    })
  }
}

const apiController = {
  // index
  index (req, res, next) {
    res.json(res.locals.data.todos)
  },

  // show
  show (req, res, next) {
    res.json(res.locals.data.todo)
  }
}

module.exports = { dataController, apiController }
