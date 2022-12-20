const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/todo')

// index - /api/todos/
router.get('/', dataController.index, apiController.index)
// create - /api/todos
router.post('/', dataController.create, apiController.show)
// update - /api/todos/:id
router.put('/:id', dataController.update, apiController.show)
// delete - /api/todos/:id
router.delete('/:id', dataController.destroy, apiController.show)
// show - /api/todos/:id
router.get('/:id', dataController.show, apiController.show)

module.exports = router
