// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for a task
const taskSchema = mongoose.Schema(
	{
		// Define a field for the task description
		task: { type: String },

		// Define a field for the status of the task with options 'backlog', 'todo', 'doing', and 'done'
		status: {
			type: String,
			enum: ['backlog', 'todo', 'doing', 'done'],
			default: 'backlog', // Default status is 'backlog'
		},

		// Define a field to associate the task with the user who created it
		cretedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', // Reference to the 'User' model
		},
	},
	{ timestamps: true } // Enable timestamps for 'createdAt' and 'updatedAt'
);

// Create a Mongoose model named 'Task' based on the 'taskSchema'
const Task = mongoose.model('Task', taskSchema);

// Export the 'Task' model to use in other parts of the application
module.exports = Task;
