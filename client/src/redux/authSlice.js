// Import necessary dependencies
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';

// Initialize the current user based on local storage or null
const initialUser = localStorage.getItem('auth')
	? JSON.parse(localStorage.getItem('auth'))
	: null;

// Define the initial state for the authentication slice
const initialState = {
	isLoading: false, // Loading state
	currentUser: initialUser, // Current user data
	error: null, // Error information
};

// Create an authentication slice using Redux Toolkit
export const authSlice = createSlice({
	name: 'auth', // Slice name
	initialState: initialState, // Initial state
	reducers: {
		// Reducer for successful login
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		// Reducer for login failure
		loginFailure: (state, action) => {
			state.error = action.payload;
		},
		// Reducer for successful registration
		registerSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		// Reducer for registration failure
		registerFailure: (state, action) => {
			state.error = action.payload;
		},
		// Reducer for successful logout
		logoutSuccess: (state) => {
			state.currentUser = null;
		},
	},
});

// Export the action creators
export const {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
	logoutSuccess,
} = authSlice.actions;

// Export the authentication reducer
export default authSlice.reducer;

// Action creator for user registration
export const register = (user) => async (dispatch) => {
	try {
		// Prepare form data
		const formdata = new FormData();
		formdata.append('username', user.username);
		formdata.append('email', user.email);
		formdata.append('password', user.password);

		// Configure HTTP headers
		const config = {
			headers: {
				'Content-Type': 'application/json', // Set the correct content type
			},
		};

		// Make a POST request to the registration endpoint
		const response = await axios.post(
			'http://localhost:4000/auth/register',
			formdata,
			config
		);

		if (response.status === 200) {
			// Registration was successful
			dispatch(registerSuccess(response.data));
			history.push('/signin'); // Redirect to the sign-in page
			window.location.reload(); // Reload the window
		} else {
			// Registration failed, handle the error
			dispatch(registerFailure(response.data)); // You can pass an error message or data from the server
		}
	} catch (error) {
		// An error occurred during the request (e.g., network error)
		console.error(error);
		dispatch(registerFailure('An error occurred during registration.'));
	}
};

// Action creator for user sign-in
export const signin = (user) => async (dispatch) => {
	try {
		const userData = {
			email: user.email,
			password: user.password,
		};
		const response = await axios.post(
			'http://localhost:4000/auth/signin',
			userData
		);
		if (response) {
			localStorage.setItem('auth', JSON.stringify(response.data));
			dispatch(loginSuccess(response.data));
			history.push('/dashboard'); // Redirect to the dashboard
			window.location.reload(); // Reload the window
		} else {
			dispatch(loginFailure());
		}
	} catch (error) {
		dispatch(loginFailure());
	}
};
