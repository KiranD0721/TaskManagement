// Import the necessary modules
const express = require('express');
const app = express();
const cors = require('cors');

// Import the database connection and routes
require('../database/db');
const authRoutes = require('./routes/authRoute');
const taskRouter = require('./routes/taskRoute');

// Set the port for the server to listen on
const port = 4000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define routes for authentication and tasks
app.use('/auth', authRoutes);
app.use('/task', taskRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running on', port);
});
