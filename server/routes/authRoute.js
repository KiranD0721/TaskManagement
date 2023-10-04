// Import the necessary modules
const express = require('express');
const router = express.Router();

// Import the authentication controller
const authController = require('../controllers/authController');

// Route for user sign-in
router.route('/signin').post(authController.signin);

// Route for user registration
router.route('/register').post(authController.register);

// Export the router for use in the application
module.exports = router;
