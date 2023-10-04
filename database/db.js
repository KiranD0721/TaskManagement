// Import the mongoose library
const mongoose = require('mongoose');

// Define the MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/taskmanagement';

// Define Mongoose connection options
const options = {
	useNewUrlParser: true, // Use the new URL parser
	useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
};

// Connect to the MongoDB database using Mongoose
mongoose
	.connect(mongoURI, options) // Use the specified URI and options
	.then(() => {
		console.log('Connected to MongoDB'); // Connection successful message
		// You can start your application or perform additional operations here
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error); // Connection error message
	});
