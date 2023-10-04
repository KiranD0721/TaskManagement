// Import the mongoose library and bcrypt for password hashing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for a user
const userSchema = mongoose.Schema(
	{
		// Define a field for the user's username
		username: { type: String },

		// Define a field for the user's email
		email: { type: String },

		// Define a field for the user's password
		password: { type: String },
	},
	{ timestamps: true } // Enable timestamps for 'createdAt' and 'updatedAt'
);

// Use a pre-save hook to hash the user's password before saving to the database
userSchema.pre('save', function (next) {
	let user = this;

	// Check if the password has been modified before hashing
	if (user.isModified('password')) {
		// Hash the password using bcrypt with a salt round of 12
		return bcrypt.hash(user.password, 12, function (err, hash) {
			if (err) {
				return next(err);
			}
			// Replace the user's password with the hashed password
			user.password = hash;
			return next();
		});
	} else {
		return next();
	}
});

// Define a custom method to compare the user's password with a provided password
userSchema.methods.comparePassword = function (password, next) {
	bcrypt.compare(password, this.password, function (err, match) {
		if (err) {
			return next(err, false);
		}

		// Return whether the provided password matches the hashed password
		return next(null, match);
	});
};

// Create a Mongoose model named 'User' based on the 'userSchema'
const User = mongoose.model('User', userSchema);

// Export the 'User' model to use in other parts of the application
module.exports = User;
