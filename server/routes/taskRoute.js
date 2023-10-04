// Import the necessary modules
const express = require('express');
const router = express.Router();

// Import the task controller
const taskController = require('../controllers/taskController');

// Route for adding a task
router.route('/add').post(taskController.addTask);

// Route for getting all tasks
router.route('/tasks').get(taskController.getAllTasks);

// Route for editing a task by ID
router.route('/edit/:id').put(taskController.editTask);

// Route for changing the status or deleting a task by ID
router
	.route('/:id')
	.put(taskController.statusChange)
	.delete(taskController.deleteTask);

// Export the router for use in the application
module.exports = router;
