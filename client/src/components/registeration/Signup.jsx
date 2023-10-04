// Import React and necessary stylesheets
import React, { useState } from 'react';
import '../registeration/registeration.scss'; // Styles for the Signup component
import '../../styles/components/_buttons.scss'; // Button styles
import { useDispatch } from 'react-redux'; // Import useDispatch hook for Redux
import { register } from '../../redux/authSlice'; // Import the register action from Redux

// Define the Signup component
const Signup = () => {
	// Initialize Redux dispatch
	const dispatch = useDispatch();

	// Initialize component state using the useState hook
	const [state, setState] = useState({
		email: '',
		password: '',
		username: '',
	});

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		// Dispatch the register action with the provided username, email, and password
		dispatch(
			register({
				username: state.username,
				password: state.password,
				email: state.email,
			})
		);
	};

	// Handle input changes and update the component state
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	console.log(state.email, state.password, state.username);

	return (
		<div className='signup-form'>
			<div className='signup-form__wrapper'>
				<form className='form' onSubmit={handleSubmit}>
					<h4>Sign up</h4>

					<div className='form-group'>
						<input
							type='text'
							placeholder='Enter Name'
							name='username'
							value={state.username}
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							name='email'
							value={state.email}
							id=''
							placeholder='Enter Email'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							value={state.password}
							id=''
							placeholder='Enter Password'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<button className='button'>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// Export the Signup component as the default export
export default Signup;
