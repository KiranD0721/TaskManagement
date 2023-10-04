// Import required modules and models
const User = require('../../database/model/user.model');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');

// Controller function for user sign-in
const signin = async (req, res) => {
	let { email, password } = req.body;
	try {
		// Find a user with the provided email
		let user = await User.findOne({ email });
		console.log(user, req.body);
		if (!user) {
			return res.status(400).send('Email does not exist');
		}

		// Compare the provided password with the user's hashed password
		user.comparePassword(password, (err, match) => {
			if (!match || err) return res.status(400).send('Password does not match');

			// Generate a JSON Web Token (JWT) for authentication
			let token = jwt.sign({ _id: user._id }, 'kljclsadflkdsjfklsdjfklsdjf', {
				expiresIn: '24h',
			});

			// Respond with user data and the generated token
			res.status(200).send({
				token,
				username: user.username,
				email: user.email,
				id: user._id,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		});
	} catch (error) {
		return res.status(400).send('Login failed');
	}
};

// Controller function for user registration
const register = async (req, res) => {
	console.log(req.body, 'req');
	const { username, password, email } = req.body;
	try {
		if (!username) return res.status(400).send('Username is required');

		if (!email) return res.status(400).send('Email is required');

		if (!validator.validate(email)) {
			return res.status(400).send('Enter a valid email ID');
		}
		if (!password || password.length < 6) {
			return res.status(400).send('Enter a valid password (minimum 6 characters)');
		}

		// Check if a user with the provided email already exists
		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(400).send('Email is already taken');
		}

		// Create a new user based on the provided data
		const user = new User({
			email,
			username,
			password,
		});

		// Save the new user to the database
		await user.save();

		// Respond with the newly created user
		return res.status(200).send(user);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Error creating user');
	}
};

// Export the controller functions for use in routes
module.exports = {
	signin,
	register,
};
